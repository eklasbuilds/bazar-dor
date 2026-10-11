import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import MarketBoard from "@/components/MarketBoard";
import { getProductBySlug } from "@/lib/api";
import { getAuth } from "@/lib/auth";
import { changeLabel, changeTone, formatTaka, marketSummary, priceStats, unitLabel } from "@/lib/format";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const auth = await getAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?next=/product/${slug}&protected=1`);
  }

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const stats = priceStats(product);
  const tone = changeTone(product);

  return (
    <article className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="text-6xl" aria-hidden>
            {product.image}
          </div>
          <h1 className="mt-3 text-4xl font-bold text-ink">{product.nameBn}</h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">{marketSummary(product)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="category-link active">
              {product.categoryIcon} {product.categoryNameBn}
            </span>
            <span className="category-link border-line bg-white">{unitLabel(product.unit)}</span>
            <span className={`change-badge ${tone}`}>{changeLabel(product)}</span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          <Stat label="সর্বনিম্ন দাম" value={formatTaka(stats.min)} />
          <Stat label="সর্বোচ্চ দাম" value={formatTaka(stats.max)} />
          <Stat label="গড় দাম" value={formatTaka(stats.average)} />
        </div>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Stat label="গতকাল" value={formatTaka(product.yesterday)} />
        <Stat label="গত সপ্তাহ" value={formatTaka(product.lastWeek)} />
        <Stat label="গত মাস" value={formatTaka(product.lastMonth)} />
      </div>

      <MarketBoard markets={product.markets} />
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-ink">{value}</p>
    </div>
  );
}
