import { changeLabel, formatTaka } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function PriceTicker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const items = [...products, ...products];

  return (
    <div className="ticker" aria-label="আজকের দামের চলমান তালিকা">
      <div className="ticker-track">
        {items.map((product, index) => (
          <span className="ticker-item" key={`${product.slug}-${index}`}>
            <span>{product.image}</span>
            <span>{product.nameBn}</span>
            <strong>{formatTaka(product.today)}</strong>
            <span className={product.change.dir}>{changeLabel(product)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
