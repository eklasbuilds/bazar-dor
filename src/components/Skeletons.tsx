export function ProductSkeletonGrid() {
  return (
    <div className="product-grid" aria-hidden>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="h-36 animate-pulse rounded-2xl bg-sand" />
      ))}
    </div>
  );
}
