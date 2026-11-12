import { SidebarSkeleton } from "./SidebarSkeleton";
import { HeaderSkeleton } from "./HeaderSkeleton";
import { DashboardCardsSkeleton } from "./DashboardCardsSkeleton";
import { DashboardTablesSkeleton } from "./DashboardTablesSkeleton";
import { ChartSkeleton } from "./ChartSkeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex overflow-hidden">
     
        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden px-6 pb-10">
          <DashboardCardsSkeleton />
          <DashboardTablesSkeleton />
          <ChartSkeleton />
        </div>
     
    </div>
  );
}
