export default function Loading() {
  return (
    // <div>loadingggg....</div>
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-64 bg-gray-200 rounded mb-8"></div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl border border-gray-100 h-32 flex flex-col justify-between"
          >
            <div className="flex justify-between">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded mt-4"></div>
          </div>
        ))}
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 h-96 bg-gray-200 rounded-xl"></div>
        <div className="lg:col-span-1 h-64 bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  );
}
