import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClient";

const createOrRewriteLeaderboardFn = async (body) => {
  return apiClient.patch(
    `${import.meta.env.APP_API_HOST}/api/leaderboard/rewrite`,
    body,
  );
};

export const useCreateOrRewriteLeaderboardMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrRewriteLeaderboardFn,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};
