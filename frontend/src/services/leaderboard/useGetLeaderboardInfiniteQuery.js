import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const leaderboardKeys = (limit) => ["leaderboard", { limit }];

const getLeaderboardFn = async ({ page, limit }) => {
  return apiClient.get(`${import.meta.env.APP_API_HOST}/leaderboard`, {
    params: {
      page,
      limit,
    },
  });
};

export const useGetLeaderboardInfiniteQuery = (limit = 10) => {
  return useInfiniteQuery({
    queryKey: leaderboardKeys(limit),
    queryFn: async ({ pageParam = 1 }) => {
      return getLeaderboardFn({ page: pageParam, limit });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (
        !lastPage ||
        typeof lastPage.page !== "number" ||
        typeof lastPage.totalPages !== "number"
      ) {
        return undefined;
      }
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page?.data || []),
  });
};
