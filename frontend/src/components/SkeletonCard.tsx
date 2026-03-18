export function SkeletonCard() {
  return (
    <div className="bg-ink-800 border border-ink-700 rounded-xl p-6 space-y-3 animate-pulse">
      <div className="flex gap-2">
        <div className="h-3 w-8 bg-ink-700 rounded" />
        <div className="h-3 w-20 bg-ink-700 rounded" />
      </div>
      <div className="h-5 w-3/4 bg-ink-700 rounded" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-ink-700 rounded" />
        <div className="h-3 w-5/6 bg-ink-700 rounded" />
        <div className="h-3 w-4/6 bg-ink-700 rounded" />
      </div>
    </div>
  );
}
