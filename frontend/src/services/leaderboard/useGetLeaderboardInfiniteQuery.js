import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const leaderboardKeys = (params) => ["leaderboard", params];

const getLeaderboardFn = async ({ page, limit, sort }) => {
  return apiClient.get(`${import.meta.env.APP_API_HOST}/leaderboard`, {
    params: {
      page,
      limit,
      sort,
    },
  });
};

export const useGetLeaderboardInfiniteQuery = ({
  limit = 10,
  sort = "desc",
}) => {
  return useInfiniteQuery({
    queryKey: leaderboardKeys({ limit, sort }),
    queryFn: async ({ pageParam = 1, signal }) => {
      return getLeaderboardFn({ page: pageParam, limit, sort, signal });
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
