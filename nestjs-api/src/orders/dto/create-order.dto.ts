import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { OrderItem } from '../entities/order-item.entity';

export class CreateOrderDto {
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItemsDtop[];

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  card_hash: string;
}

export class OrderItemsDtop {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @MaxLength(36)
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
