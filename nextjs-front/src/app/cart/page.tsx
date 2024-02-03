import { removeFromCart } from "@/actions/cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { getCart } from "@/services/cart";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CartPage() {
  const cart = getCart();

  if (cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-gray-600 text-lg">Your cart is empty</p>
        <Link href="/" className={cn(buttonVariants(), "mt-4")}>
          Go back to shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-bold text-gray-900 text-lg">Cart</h1>
      <ul className="flex flex-col gap-2 mt-4">
        {cart.items.map((item) => (
          <li key={item.id}>
            <form
              className="w-full p-4 flex items-center gap-4 justify-between bg-white border border-gray-200 rounded-xl"
              action={removeFromCart}
            >
              <input type="hidden" name="product_id" value={item.product_id} />
              <div className="flex gap-4">
                <Image
                  alt={item.name}
                  src={item.image_url}
                  width={50}
                  height={50}
                  className="rounded-lg overflow-hidden object-cover"
                />
                <span>
                  <p className="text-sm">{item.name}</p>
                  <p className="text-xs mt-2 text-gray-600">
                    Qtd: {item.quantity}
                  </p>
                </span>
              </div>
              <span>
                <p className="text-xs text-gray-600">Price</p>
                <p className="text-md ">{formatCurrency(item.price)}</p>
              </span>
              <Button
                variant="outline"
                className="text-red-500 hover:text-red-600"
                size={"icon"}
                type="submit"
                // onClick={() => console.log("remove")}
              >
                <Trash size={14} />
              </Button>
            </form>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-col items-end">
        <p className="text-xl">Total: {formatCurrency(cart.total)}</p>
        <span className="mt-4">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "ghost" }), "mr-4")}
          >
            Continue shopping
          </Link>
          <Link href="/checkout" className={cn(buttonVariants())}>
            Checkout
          </Link>
        </span>
      </div>
    </div>
  );
}

export default CartPage;
