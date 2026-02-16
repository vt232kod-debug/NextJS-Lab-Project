export default function ArticlesLoading() {
  return (
    <div>
      <div className="h-9 w-40 bg-gray-200 rounded mb-6 animate-pulse" />
      <div className="grid grid-cols-1 md-screen:grid-cols-2 lg-screen:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg p-4 animate-pulse"
          >
            <div className="h-4 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-5 w-full bg-gray-200 rounded mb-2" />
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-3" />
            <div className="h-4 w-full bg-gray-200 rounded mb-1" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
