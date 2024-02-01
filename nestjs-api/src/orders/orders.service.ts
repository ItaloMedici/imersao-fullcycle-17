import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/product.entity';
import { In, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private amqpConnection: AmqpConnection,
  ) {}

  async create(createOrderDto: CreateOrderDto & { client_id: string }) {
    const unicProductsIds = [
      ...new Set(createOrderDto.items.map((item) => item.product_id)),
    ];

    const products = await this.productRepository.findBy({
      id: In(unicProductsIds),
    });

    if (products.length !== unicProductsIds.length) {
      throw new Error(
        `Alguns produtos não existem! Produtos encontrados: ${unicProductsIds} esperado: ${unicProductsIds.length}`,
      );
    }

    const order = Order.create({
      client_id: createOrderDto.client_id,
      items: createOrderDto.items.map((item) => {
        const product = products.find(
          (product) => product.id === item.product_id,
        );
        return {
          price: product.price,
          product_id: item.product_id,
          quantity: item.quantity,
        };
      }),
    });

    await this.orderRepository.save(order);

    await this.amqpConnection.publish('amq.direct', 'OrderCreated', {
      order_id: order.id,
      card_hash: createOrderDto.card_hash,
      total: order.total,
    });

    return order;
  }

  findAll(client_id: string) {
    return this.orderRepository.find({
      where: { client_id },
      order: {
        created_at: 'DESC',
      },
    });
  }

  findOne(id: string, client_id: string) {
    return this.orderRepository.findOneOrFail({ where: { id, client_id } });
  }
}
