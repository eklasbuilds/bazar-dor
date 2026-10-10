import { ProductSkeletonGrid } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 h-40 animate-pulse rounded-3xl bg-sand" />
      <p className="mb-4 text-sm text-muted">দামের তথ্য লোড হচ্ছে...</p>
      <ProductSkeletonGrid />
    </div>
  );
}
