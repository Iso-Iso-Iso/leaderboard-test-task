import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

// 1. Mutation function defined above the hook, receiving params as an object
const appendLeaderboardFn = async ({ userName, value }) => {
  return apiClient.patch(`${import.meta.env.APP_API_HOST}/leaderboard/append`, {
    userName,
    value: Number(value),
  });
};

// 2. Custom mutation hook
export const useAppendLeaderboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appendLeaderboardFn,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};
