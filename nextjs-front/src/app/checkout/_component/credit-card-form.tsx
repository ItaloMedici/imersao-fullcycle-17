"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CreditCard,
  creditCardValidator,
} from "@/lib/schemas/credit-card-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

function CreditCardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreditCard>({
    resolver: zodResolver(creditCardValidator),
  });

  const submit = (data: CreditCard) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <h1 className="font-bold text-gray-900 text-2xl mb-6">Payment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <span>
          <Input
            type="text"
            placeholder="Card Number"
            {...register("number")}
          />
          {errors?.number && (
            <span className="text-red-500 text-sm">
              {errors.number.message}
            </span>
          )}
        </span>
        <span>
          <Input type="text" placeholder="Name" {...register("name")} />
          {errors?.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </span>
        <span>
          <Input
            type="text"
            placeholder="Expiration Date"
            {...register("expiration_date")}
          />
          {errors?.expiration_date && (
            <span className="text-red-500 text-sm">
              {errors.expiration_date.message}
            </span>
          )}
        </span>
        <span>
          <Input type="text" placeholder="CVV" {...register("cvv")} />
          {errors?.cvv && (
            <span className="text-red-500 text-sm">{errors.cvv.message}</span>
          )}
        </span>
      </div>
      <Button className="w-full md:w-fit mt-8" type="submit">
        Pay
      </Button>
    </form>
  );
}

export { CreditCardForm };
