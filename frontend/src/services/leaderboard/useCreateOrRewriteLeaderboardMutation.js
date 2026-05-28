import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

// 1. Mutation function defined above the hook, receiving params as an object
const createOrRewriteLeaderboardFn = async ({ userName, value }) => {
  return apiClient.post(`${import.meta.env.APP_API_HOST}/leaderboard`, {
    userName,
    value: Number(value),
  });
};

// 2. Custom mutation hook
export const useCreateOrRewriteLeaderboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrRewriteLeaderboardFn,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};
