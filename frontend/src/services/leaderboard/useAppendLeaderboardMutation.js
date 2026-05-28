import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

const appendLeaderboardFn = async (body) => {
  return apiClient.patch(
    `${import.meta.env.APP_API_HOST}/api/leaderboard/append`,
    body,
  );
};

export const useAppendLeaderboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: appendLeaderboardFn,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};
