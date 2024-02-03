import { Cart } from "@/lib/schemas/cart-schema";
import { redirect } from "next/navigation";
import { CreditCardForm } from "./_component/credit-card-form";
import { formatCurrency } from "@/lib/utils";

const cart: Cart = {
  id: "21997e88-429c-4c56-8236-854ced93e1df",
  client_id: "21997e88-429c-4c56-8236-854ced93e1df",
  items: [
    {
      id: "21997e88-429c-4c56-8236-854ced93e1df",
      product_id: "21997e88-429c-4c56-8236-854ced93e1df",
      quantity: 1,
      price: 100,
      image_url: "https://source.unsplash.com/random?product",
      name: "Product 1",
    },
  ],
  total: 100,
};

function CheckoutPage() {
  if (!cart.items.length) {
    redirect("/cart");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CreditCardForm />
      <div className="flex flex-col gap-6">
        <h2 className="font-bold text-gray-900 text-2xl">Resume</h2>
        <div className="flex justify-between">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name}</span>
              <span>{formatCurrency(item.price)}</span>
            </div>
          ))}
          <span>Subtotal</span>
          <span>R$ 100</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
