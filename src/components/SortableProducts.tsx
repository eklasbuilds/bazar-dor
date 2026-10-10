"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { sortProducts } from "@/lib/format";
import type { Product, SortKey } from "@/lib/types";

const options: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortableProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const sorted = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <div>
      <label className="mb-5 flex flex-col gap-2 text-sm font-medium text-ink sm:flex-row sm:items-center">
        সাজান
        <select
          className="select select-bordered w-full max-w-xs bg-white"
          value={sort}
          onChange={(event) => setSort(event.target.value as SortKey)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <div className="product-grid">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
