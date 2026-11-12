import { useInfiniteQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchPortfolios,
  updatePortfolio,
  deletePortfolio,
  enablePortfolio,
  disablePortfolio,
  addPortfolio,
} from "../api/portfolios";
import moment from "moment-timezone";

const TAKE = 10;

export function usePortfolios({ search = "" , status, sortBy, order } = {}) {
  const queryClient = useQueryClient();

  // ✅ نسخه سازگار با React Query v5
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["portfolios", { search, status, sortBy, order }],
    queryFn: ({ pageParam = 0 }) =>
      fetchPortfolios({ offset: pageParam, take: TAKE, search, status, sortBy, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.flatMap(p => p.data).length;
      if (fetched < lastPage.total) return fetched;
      return undefined;
    },
    // staleTime: 1000 * 30,
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
  });

  // ✅ Mutations هم بهتره مطابق v5 باشن
  const addMut = useMutation({
    mutationFn: ({ payload }) => addPortfolio(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
  const updateMut = useMutation({
    mutationFn: ({ id, payload }) => updatePortfolio(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["symbol_portfolio"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-detail"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-chart"] });
    
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id) => deletePortfolio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["symbol_portfolio"] });

    },
  });

  const enableMut = useMutation({
    mutationFn: (id) => enablePortfolio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["symbol_portfolio"] });
    },
  });

  const disableMut = useMutation({
    mutationFn: (id) => disablePortfolio(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["symbol_portfolio"] });

    },
  });

  return {
    ...infiniteQuery,
    loadMore: () => {
      const nextOffset = infiniteQuery.data
        ? infiniteQuery.data.pages.flatMap(p => p.data).length
        : 0;
      infiniteQuery.fetchNextPage({ pageParam: nextOffset });
    },
    addMut,
    updateMut,
    deleteMut,
    enableMut,
    disableMut,
    TAKE,
  };
}
