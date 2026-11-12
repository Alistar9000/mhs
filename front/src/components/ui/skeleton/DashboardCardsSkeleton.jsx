export function DashboardCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mt-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between animate-pulse"
        >
          <div className="h-5 w-28 bg-gray-200 rounded mb-4"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
