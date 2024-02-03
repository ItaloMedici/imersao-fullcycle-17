import { z } from "zod";

export const productValidator = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  image_url: z.string().url(),
  category_id: z.string(),
});

export type Product = z.infer<typeof productValidator>;
