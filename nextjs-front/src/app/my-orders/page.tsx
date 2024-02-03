import { Order, OrderStatus } from "@/lib/schemas/order-shecma";

const oders: Order[] = [
  {
    id: "21997e88-429c-4c56-8236-854ced93e1df",
    client_id: "21997e88-429c-4c56-8236-854ced93e1df",
    status: "paid",
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
  },
  {
    id: "21997e88-429c-4c56-8236-854ced93e1df",
    client_id: "21997e88-429c-4c56-8236-854ced93e1df",
    status: "paid",
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
  },
  {
    id: "21997e88-429c-4c56-8236-854ced93e1df",
    client_id: "21997e88-429c-4c56-8236-854ced93e1df",
    status: "pending",
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
  },
];

const status: Record<OrderStatus, string> = {
  paid: "Paid 🎉",
  pending: "Waiting for payment 💸",
};

function MyOrders() {
  return (
    <div>
      <h1 className="font-bold text-gray-900 text-lg">My Orders</h1>
      <ul className="flex flex-col gap-2 mt-4">
        {oders.map((order) => (
          <li
            key={order.id}
            className="w-full p-4 flex items-center gap-4 justify-between bg-white border border-gray-200 rounded-xl"
          >
            <div className="flex gap-4">
              <span>
                <p className="text-sm">Status: {status[order.status]}</p>
                <p className="text-xs mt-2 text-gray-600">ID: {order.id}</p>
              </span>
            </div>
            <span>
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-md ">R$ {order.total}</p>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyOrders;
