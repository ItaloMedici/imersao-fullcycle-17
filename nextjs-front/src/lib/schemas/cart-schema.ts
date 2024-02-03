import { z } from "zod";
import { orderItemValidator } from "./order-shecma";

export const cartValidator = z.object({
  id: z.string().uuid().optional(),
  client_id: z.string().uuid().optional(),
  items: orderItemValidator.array(),
  total: z.number(),
});

export type Cart = z.infer<typeof cartValidator>;
