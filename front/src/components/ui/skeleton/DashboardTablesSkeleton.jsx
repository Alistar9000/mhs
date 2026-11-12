export function DashboardTablesSkeleton() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
      {/* جدول 5 سبد با بیشترین بازدهی */}
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-3 last:border-0"
            >
              <div className="h-5 w-32 bg-gray-200 rounded"></div>
              <div className="h-5 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* جدول 3 نماد با بیشترین سهم در ارزش کل */}
      <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
        <div className="h-6 w-56 bg-gray-200 rounded mb-6"></div>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b pb-3 last:border-0"
            >
              <div className="h-5 w-28 bg-gray-200 rounded"></div>
              <div className="h-5 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
