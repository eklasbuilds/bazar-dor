import { ProductSkeletonGrid } from "@/components/Skeletons";

export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-3 h-8 w-16 animate-pulse rounded bg-sand" />
      <div className="mb-6 h-10 w-40 animate-pulse rounded bg-sand" />
      <p className="mb-4 text-sm text-muted">Loading...</p>
      <ProductSkeletonGrid />
    </div>
  );
}
