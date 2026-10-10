import type { Product, SortKey } from "@/lib/types";

const units: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  liter: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

const bn = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 });

export function unitLabel(unit: string) {
  return units[unit] ?? `প্রতি ${unit}`;
}

export function formatTaka(amount: number) {
  return `${bn.format(amount)} টাকা`;
}

export function formatCount(amount: number) {
  return bn.format(amount);
}

export function changeLabel(product: Product) {
  if (product.change.dir === "flat" || product.change.pct === 0) {
    return "—০%";
  }
  const arrow = product.change.dir === "up" ? "▲" : "▼";
  return `${arrow} ${bn.format(Math.abs(product.change.pct))}%`;
}

export function changeTone(product: Product) {
  if (product.change.dir === "up") return "up";
  if (product.change.dir === "down") return "down";
  return "flat";
}

export function marketSummary(product: Product) {
  if (product.change.dir === "up") {
    return `আজ ${product.nameBn}-এর দাম গতকালের চেয়ে বেড়েছে। ঢাকা থেকে সিলেট পর্যন্ত বাজারগুলোতে সরবরাহ একটু চাপে আছে।`;
  }
  if (product.change.dir === "down") {
    return `আজ ${product.nameBn}-এর দাম কমেছে। ক্রেতাদের জন্য এখন কেনা তুলনামূলক সাশ্রয়ী।`;
  }
  return `আজ ${product.nameBn}-এর দাম গতকালের সমান। বাজারে বড় কোনো ওঠানামা নেই।`;
}

export function priceStats(product: Product) {
  const min = Math.min(...product.markets.map((market) => market.min));
  const max = Math.max(...product.markets.map((market) => market.max));
  const average = Math.round(
    product.markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) /
      product.markets.length,
  );
  return { min, max, average };
}

export function sortProducts(products: Product[], sort: SortKey) {
  if (sort === "default") return products;
  return [...products].sort((a, b) => (sort === "asc" ? a.today - b.today : b.today - a.today));
}

export function topMovers(products: Product[], direction: "up" | "down") {
  return products
    .filter((product) => product.change.dir === direction)
    .sort((a, b) => (direction === "up" ? b.change.pct - a.change.pct : a.change.pct - b.change.pct))
    .slice(0, 6);
}

export function banglaDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
