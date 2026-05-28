import { z } from 'zod';

export const leaderboardUpsertSchema = z.object({
  userName: z.string().min(1, 'userName is required'),
  value: z.number(),
});

export type LeaderboardUpsertDto = z.infer<typeof leaderboardUpsertSchema>;
