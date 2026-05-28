import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

export const leaderboardKeys = (params) => ["leaderboard", params];

const getLeaderboardFn = async ({ page, limit, sort, signal }) => {
  return apiClient.get(`${import.meta.env.APP_API_HOST}/api/leaderboard`, {
    params: {
      page,
      limit,
      sort,
    },
    signal,
  });
};

export const useGetLeaderboardInfiniteQuery = ({
  limit = 10,
  sort = "desc",
}) => {
  return useInfiniteQuery({
    queryKey: leaderboardKeys({ limit, sort }),
    queryFn: async ({ pageParam = 1, signal }) => {
      console.log("CALLED");

      return getLeaderboardFn({ page: pageParam, limit, sort, signal });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;

      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    select: (data) => data.pages.flatMap((page) => page?.data || []),
  });
};
