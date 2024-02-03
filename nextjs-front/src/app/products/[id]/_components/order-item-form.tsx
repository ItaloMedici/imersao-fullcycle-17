"use client";

import { addToCart } from "@/actions/cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderItem, orderItemValidator } from "@/lib/schemas/order-shecma";
import { Product } from "@/lib/schemas/product-schema";
import { formatCurrency } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

function OrderItemForm({ product }: { product: Product }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<OrderItem>({
    resolver: zodResolver(orderItemValidator),
    defaultValues: {
      quantity: 1,
      price: product.price,
      product_price: product.price,
      product_id: product.id,
      image_url: product.image_url,
      name: product.name,
    },
  });

  const { pending } = useFormStatus();
  const quantity = watch("quantity");

  return (
    <form className="flex gap-6 mt-6 justify-center" action={addToCart}>
      <input type="hidden" {...register("product_id")} />
      <Image
        alt={product.name}
        src={product.image_url}
        width={500}
        height={500}
        className="max-w-[500px] aspect-square object-cover rounded-xl overflow-hidden flex-1"
      />
      <div className="flex flex-col gap-8 flex-1 bg-white rounded-xl p-6 border border-gray-200">
        <div>
          <h1 className="font-bold text-gray-900 text-4xl">{product.name}</h1>
          <p className=" mt-4 text-gray-600">{product.description}</p>
        </div>
        <p className="font-bold text-2xl">
          {formatCurrency(product.price * quantity)}
        </p>
        <div className="mt-auto">
          <div className="flex gap-6 items-end">
            <div className="flex-[0.5]">
              <label htmlFor="quantity" className="text-sm text-gray-600">
                Quantity
              </label>
              <Input type="number" min={1} {...register("quantity")} />
            </div>
            <Button className="flex-1" type="submit" disabled={pending}>
              Add to card
            </Button>
          </div>
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-2">
              {errors.quantity.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

export { OrderItemForm };
