import { z } from "zod";

export const loginValidator = z.object({
  username: z.string(),
  password: z.string(),
});

export type Login = z.infer<typeof loginValidator>;