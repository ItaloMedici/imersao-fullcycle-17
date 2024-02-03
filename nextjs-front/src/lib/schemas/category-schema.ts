import { z } from "zod";

const categoryValidator = z.object({
  id: z.string().uuid(),
  name: z.string(),
});

export type Category = z.infer<typeof categoryValidator>;
