export function PortfoliosRowSkeleton() {
  return (
    <div className="grid grid-cols-9 gap-4 mt-6 w-full  p-4 justify-center items-center bg-white ">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="h-8 w-28 bg-gray-200 rounded-md"></div>
      ))}
    </div>
  );
}
