import { env } from "@/env";
import { Category } from "@/lib/schemas/category-schema";
import { Product } from "@/lib/schemas/product-schema";

export const getCategory = async (id: string): Promise<Category> => {
  const response = await fetch(`${env.CATALOG_URL}/category/${id}`);
  return response.json();
};

export async function getCategories(search?: string): Promise<Category[]> {
  const response = await fetch(`${env.CATALOG_URL}/category`, {
    next: {
      revalidate: 60,
    },
  });
  const data = (await response.json()) ?? [];

  if (search) {
    return data.filter((product: Product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  return data;
}
