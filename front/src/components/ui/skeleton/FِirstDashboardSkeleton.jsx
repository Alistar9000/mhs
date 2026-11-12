import { SidebarSkeleton } from "./SidebarSkeleton";
import { HeaderSkeleton } from "./HeaderSkeleton";
import { DashboardCardsSkeleton } from "./DashboardCardsSkeleton";
import { DashboardTablesSkeleton } from "./DashboardTablesSkeleton";
import { ChartSkeleton } from "./ChartSkeleton";

export function FirstDashboardSkeleton() {
  return (
    <div className="flex w-[100vw] h-screen overflow-hidden">
      {/* Sidebar */}
      <SidebarSkeleton />

      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col bg-gray-50">

        {/* Header - fixed */}
       
        <HeaderSkeleton />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto px-6 pb-10">
          <DashboardCardsSkeleton />
          <DashboardTablesSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    </div>
  );
}
