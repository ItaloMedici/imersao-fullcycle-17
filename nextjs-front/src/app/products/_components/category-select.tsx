"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/lib/schemas/category-schema";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function CategorySelect({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSelectChange = (value: string) => {
    const url = new URL(`${pathname}?${searchParams}`, window.location.origin);

    if (value === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", value);
    }

    router.push(url.toString());
  };

  return (
    <Select
      onValueChange={onSelectChange}
      defaultValue={searchParams.get("category") ?? undefined}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { CategorySelect };
