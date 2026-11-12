export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-8 animate-pulse">
      {/* عنوان */}
      <div className="h-6 w-48 bg-gray-200 rounded mb-6"></div>

      {/* نمودار */}
      <div className="h-64 w-full bg-gray-100 rounded-lg"></div>
    </div>
  );
}
