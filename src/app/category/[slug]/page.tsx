import Link from "next/link";
import SortableProducts from "@/components/SortableProducts";
import { getCategories, getProducts } from "@/lib/api";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return (
      <div className="mx-auto flex min-h-[50vh] max-w-xl flex-col justify-center px-4 py-16">
        <p className="text-sm font-semibold text-terra">৪০৪</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">এই ক্যাটাগরি পাওয়া যায়নি</h1>
        <p className="mt-3 text-muted">এই নামে কোনো পণ্যের ধরন নেই। হোম পেজ থেকে আবার বেছে নিন।</p>
        <Link href="/" className="btn btn-primary mt-6 w-fit">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  const products = await getProducts(category.slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-4xl" aria-hidden>
        {category.icon}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink">{category.nameBn}</h1>
      <p className="mt-2 mb-6 text-muted">
        {category.nameBn} ক্যাটাগরির আজকের দাম। সংখ্যার মান অনুযায়ী সাজানো যায়।
      </p>
      {products.length === 0 ? (
        <div>
          <p className="text-muted">এই ক্যাটাগরিতে এখন কোনো পণ্য নেই।</p>
          <Link href="/" className="btn btn-primary mt-4">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <SortableProducts products={products} />
      )}
    </div>
  );
}
