import { z } from "zod";

export const orderStatusValidator = z.enum(["pending", "paid"]);

export type OrderStatus = z.infer<typeof orderStatusValidator>;

export const orderItemValidator = z.object({
  id: z.string().uuid().optional(),
  quantity: z.number().int().positive().default(1),
  price: z.number().positive(),
  product_id: z.string().uuid(),
  product_price: z.number().positive(),
  name: z.string(),
  image_url: z.string().url(),
});

export type OrderItem = z.infer<typeof orderItemValidator>;

export const orderValidator = z.object({
  id: z.string().uuid().optional(),
  client_id: z.string().uuid(),
  items: orderItemValidator.array(),
  total: z.number(),
  status: orderStatusValidator,
});

export type Order = z.infer<typeof orderValidator>;
