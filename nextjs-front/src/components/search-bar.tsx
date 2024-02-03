"use client";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = new FormData(event.target as HTMLFormElement);
    const search = form.get("search") as string;

    const url = new URL(window.location.href);
    url.searchParams.set("search", search);

    router.push(url.toString());
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Search products..."
        name="search"
        type="search"
        defaultValue={searchParams.get("search") ?? ""}
      />
    </form>
  );
}

export { SearchBar };
