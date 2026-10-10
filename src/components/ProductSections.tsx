import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/types";

export default function ProductSections({
  risers,
  fallers,
  products,
}: {
  risers: Product[];
  fallers: Product[];
  products: Product[];
}) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-8">
      <section>
        <h2 className="section-title">আজ দাম বেড়েছে ▲</h2>
        <p className="section-copy">গতকালের তুলনায় যে ছয়টি পণ্যের দাম সবচেয়ে বেশি বেড়েছে।</p>
        <div className="product-grid">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="section-title">আজ দাম কমেছে ▼</h2>
        <p className="section-copy">আজকে যে ছয়টি পণ্য কিনলে তুলনামূলক কম খরচ হবে।</p>
        <div className="product-grid">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য">
        <h2 className="section-title">সব পণ্য</h2>
        <p className="section-copy">চাল থেকে মসলা—নিত্যপ্রয়োজনীয় পণ্যের পূর্ণ তালিকা।</p>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
