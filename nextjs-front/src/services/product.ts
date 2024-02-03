import { env } from "@/env";
import { Product } from "@/lib/schemas/product-schema";

export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${env.CATALOG_URL}/product/${id}`);
  return response.json();
};

export async function getProducts(
  search?: string,
  category?: string
): Promise<Product[]> {
  const url = new URL(`${env.NEXT_API_URL}/products`);

  if (search) {
    url.searchParams.set("search", search);
  }

  if (category) {
    url.searchParams.set("category", category);
  }

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const data = (await response.json()) ?? [];

  return data;
}

export async function getProductByCategory(
  category: string
): Promise<Product[]> {
  const response = await fetch(
    `${env.CATALOG_URL}/product/category/${category}`
  );
  return response.json();
}
