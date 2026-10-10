import type { Category, Product } from "@/lib/types";

const bases = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function readJson<T>(path: string): Promise<T> {
  let lastError: unknown;
  for (const base of bases) {
    try {
      const response = await fetch(`${base}${path}`, { next: { revalidate: 120 } });
      if (!response.ok) {
        lastError = new Error(`${response.status} from ${base}`);
        continue;
      }
      return (await response.json()) as T;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError instanceof Error ? lastError : new Error("বাজারের তথ্য লোড করা যায়নি");
}

export async function getProducts(category?: string) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return readJson<Product[]>(`/products${query}`);
}

export async function getCategories() {
  return readJson<Category[]>("/categories");
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
