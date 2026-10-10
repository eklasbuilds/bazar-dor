import Link from "next/link";
import { changeLabel, changeTone, formatTaka, unitLabel } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  const tone = changeTone(product);

  return (
    <Link href={`/product/${product.slug}`} className="product-card">
      <div className="product-emoji" aria-hidden>
        {product.image}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-ink">{product.nameBn}</h3>
        <p className="text-sm text-muted">{unitLabel(product.unit)}</p>
        <div className="mt-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs tracking-wide text-muted">আজকের দাম</p>
            <p className="text-xl font-bold text-ink">{formatTaka(product.today)}</p>
          </div>
          <span className={`change-badge ${tone}`}>{changeLabel(product)}</span>
        </div>
      </div>
    </Link>
  );
}
