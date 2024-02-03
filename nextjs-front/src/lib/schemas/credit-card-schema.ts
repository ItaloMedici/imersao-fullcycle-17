import { z } from "zod";

export const creditCardValidator = z.object({
  number: z.string().length(16, "Credit card number is required"),
  expiration_date: z
    .string()
    .length(5, "Expiration date is required")
    .regex(/^\d{2}\/\d{2}$/, "Use the format MM/YY for expiration date"),
  cvv: z.string().length(3, "CVV is required"),
  name: z.string().min(1, "Name is required"),
});

export type CreditCard = z.infer<typeof creditCardValidator>;
