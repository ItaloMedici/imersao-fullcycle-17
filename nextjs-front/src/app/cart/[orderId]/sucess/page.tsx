import { Order } from "@/lib/schemas/order-shecma";

const order: Order = {
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

function CheckoutSuccessPage({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  return <div>CheckoutOrderIDPage</div>;
}

export default CheckoutOrderIDPage;
