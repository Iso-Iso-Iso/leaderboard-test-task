import { z } from 'zod';

export const leaderboardUpsertSchema = z.object({
  userName: z.string().min(1, 'userName is required'),
  value: z.number(),
  idempotencyKey: z.string().min(1, 'idempotencyKey is required'),
});

export type LeaderboardUpsertDto = z.infer<typeof leaderboardUpsertSchema>;

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}
