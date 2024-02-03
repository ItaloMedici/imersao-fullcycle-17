import { z } from "zod";

const envShema = z.object({
  CATALOG_URL: z.string().url(),
  NEXT_API_URL: z.string().url(),
});

export const env = envShema.parse(process.env);
