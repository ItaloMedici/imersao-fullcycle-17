import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrderItem } from './orders/entities/order-item.entity';
import { Order } from './orders/entities/order.entity';
import { OrdersModule } from './orders/orders.module';
import { Product } from './products/entities/product.entity';
import { ProductsModule } from './products/products.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // TODO change to env
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [Product, Order, OrderItem, User],
      synchronize: true,
      logging: true,
    }),
    ProductsModule,
    OrdersModule,
    AuthModule,
    UsersModule,
    RabbitmqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
