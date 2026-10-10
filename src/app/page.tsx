import Hero from "@/components/Hero";
import ProductSections from "@/components/ProductSections";
import { getProducts } from "@/lib/api";
import { topMovers } from "@/lib/format";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProductSections
        risers={topMovers(products, "up")}
        fallers={topMovers(products, "down")}
        products={products}
      />
    </>
  );
}
