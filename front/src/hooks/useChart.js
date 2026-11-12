import { useQuery } from "@tanstack/react-query";
import { fetchPortfolioChart } from "../api/portfolios";
import { fetchDashboardChart } from "../api/dashboard";
import moment from "moment-timezone";

export function usePortfolioChart(id, range) {
  return useQuery({
    queryKey: ["portfolio-chart", id, range],
    queryFn: () => fetchPortfolioChart(id, range),
    enabled: !!id,
    keepPreviousData: true,
    refetchInterval: () => {
              const now = moment().tz('Asia/Tehran');
              const hours = now.hours();
              const minutes = now.minutes();
              if (hours >= 9 && hours <= 12 && minutes <= 30) {
                return 60000;
              }
              return false;
            },
    // staleTime: 1000 * 60,
  });
}

export function useDashboardChart(range) {
  return useQuery({
    queryKey: ["dashboard-chart", range],
    queryFn: () => fetchDashboardChart(range),

    keepPreviousData: true,
    refetchInterval: () => {
              const now = moment().tz('Asia/Tehran');
              const hours = now.hours();
              const minutes = now.minutes();
              if (hours >= 9 && hours <= 12 && minutes <= 30) {
                return 60000;
              }
              return false;
            },
    // staleTime: 1000 * 60,
  });
}
