import { addToCart } from "@/actions/cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, formatCurrency } from "@/lib/utils";
import { getCategories } from "@/services/category";
import { getProducts } from "@/services/product";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CategorySelect } from "./_components/category-select";

async function ProductsPage({
  searchParams: { search, category },
}: {
  searchParams: { search: string; category: string };
}) {
  const products = await getProducts(search, category);
  const categories = await getCategories();

  if (!products.length) {
    return (
      <div className="flex flex-col items-center text-gray-400">
        <p>No products found :(</p>
        <Link
          className={cn(buttonVariants({ variant: "link" }), "mt-4")}
          href={"/products"}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div>
      <span className="flex w-full justify-between items-center">
        <h1 className="font-bold text-gray-900 text-2xl">Products</h1>
        <CategorySelect categories={categories} />
      </span>

      <ul className="grid grid-cols-2 lg:grid-cols-3 mt-4 gap-4 justify-items-stretch">
        {products.map((product) => (
          <li
            key={product.id}
            className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
          >
            <Link href={`/products/${product.id}`}>
              <div className="rounded-md overflow-hidden my-0 mx-auto">
                <Image
                  alt={product.name}
                  src={product.image_url}
                  width={300}
                  height={200}
                  className="w-full h-[200px] object-cover"
                />
              </div>
            </Link>
            <form className="flex gap-4 mt-4 flex-col" action={addToCart}>
              <div className="flex gap-1 flex-col">
                <Link href={`/products/${product.id}`} className="w-fit">
                  <h2 className="font-semibold w-fit">{product.name}</h2>
                </Link>
                <p className="text-sm text-gray-500">{product.description}</p>
              </div>
              <p className="font-bold">{formatCurrency(product.price)}</p>
              <input type="hidden" name="product_id" value={product.id} />
              <Button type="submit">Add to cart</Button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsPage;
