import { getProduct } from "@/services/product";
import { OrderItemForm } from "./_components/order-item-form";

async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await getProduct(id);
  return <OrderItemForm product={product} />;
}

export default ProductPage;
