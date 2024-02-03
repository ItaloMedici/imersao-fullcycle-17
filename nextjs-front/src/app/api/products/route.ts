import { Product } from "@/lib/schemas/product-schema";
import { NextRequest, NextResponse } from "next/server";
import { env } from "process";

export async function GET(req: NextRequest) {
  const searchParam = req.nextUrl.searchParams;

  const search = searchParam.get("search");
  const category = searchParam.get("category");

  const url = new URL("/product", env.CATALOG_URL);

  if (category) {
    url.pathname = `${url.pathname}/category/${category}`;
  }

  console.log(url);

  const response = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  console.log(response);

  let data = (await response.json()) ?? [];

  if (search) {
    data = data.filter((product: Product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  return NextResponse.json(data);
}
