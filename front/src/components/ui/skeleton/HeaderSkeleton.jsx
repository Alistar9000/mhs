export function HeaderSkeleton() {
  return (
    <header className="w-full h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      {/* Left: Page title */}
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>

      {/* Right: user avatar / actions */}
      <div className="flex items-center space-x-4">
        <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
    </header>
  );
}
