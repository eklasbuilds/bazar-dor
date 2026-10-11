import { formatTaka } from "@/lib/format";
import type { MarketPrice } from "@/lib/types";

export default function MarketBoard({ markets }: { markets: MarketPrice[] }) {
  const divisions = [...new Set(markets.map((market) => market.division))];

  return (
    <section className="mt-8">
      <h2 className="section-title">বাজারভিত্তিক আজকের দাম</h2>
      <p className="section-copy">একই পণ্যের সর্বনিম্ন ও সর্বোচ্চ দাম, বিভাগ অনুযায়ী।</p>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {divisions.map((division) => (
          <article key={division} className="rounded-2xl border border-line bg-white p-4">
            <h3 className="mb-3 font-semibold text-ink">{division}</h3>
            <ul className="space-y-3">
              {markets
                .filter((market) => market.division === division)
                .map((market) => (
                  <li key={market.market} className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-ink">{market.market}</span>
                    <span className="shrink-0 text-right text-muted">
                      {formatTaka(market.min)} – {formatTaka(market.max)}
                    </span>
                  </li>
                ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
