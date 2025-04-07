export function LoadingFeed() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-gradient-message animate-pulse rounded-2xl shadow-lg border border-primary/10 p-5 h-40"
        />
      ))}
    </div>
  )
}

