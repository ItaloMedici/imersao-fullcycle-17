import { Cart } from "@/lib/schemas/cart-schema";
import { cookies } from "next/headers";
import { getProduct } from "./product";

const cartKey = "cart" as const;

const defaultCart: Cart = {
  items: [],
  total: 0,
};

export function setCart(cart: Cart) {
  cookies().set(cartKey, JSON.stringify(cart));
}

export function getCart(): Cart {
  const cartRaw = cookies().get("cart")?.value;
  return cartRaw ? JSON.parse(cartRaw) : defaultCart;
}

export function clearCart() {
  cookies().delete(cartKey);
}

export async function addItemToCart(productId: string, quantity: string) {
  const cart = getCart();

  const product = await getProduct(productId);

  const itemPrice = parseInt(quantity) * product.price;

  cart.items.push({
    quantity: parseInt(quantity),
    price: itemPrice,
    product_id: product.id,
    product_price: product.price,
    name: product.name,
    image_url: product.image_url,
  });

  cart.total += itemPrice;

  setCart(cart);
}

export async function removeItemFromCart(productId: string) {
  const cart = getCart();

  const item = cart.items.find((item) => item.product_id === productId);

  if (!item) {
    return;
  }

  cart.total -= item.price;

  cart.items = cart.items.filter((item) => item.product_id !== productId);

  setCart(cart);
}
