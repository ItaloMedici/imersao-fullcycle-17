"use server";

import { addItemToCart, removeItemFromCart } from "@/services/cart";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCart(formData: FormData) {
  const productId = formData.get("product_id") as string;
  const quantity = (formData.get("quantity") as string) ?? "1";

  await addItemToCart(productId, quantity);

  redirect("/cart");
}

export async function removeFromCart(formData: FormData) {
  const productId = formData.get("product_id") as string;

  removeItemFromCart(productId);
  revalidatePath("/cart");
}
