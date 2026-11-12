export function SidebarSkeleton() {
  return (
    <aside className="hidden md:flex w-[300px] h-screen bg-white border-r border-gray-200 p-4  flex-col">
      {/* Logo Skeleton */}
      <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mb-8"></div>

      {/* Menu Items */}
      <div className="space-y-4 flex-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>

      {/* Footer Action / User Info */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </aside>
  );
}
