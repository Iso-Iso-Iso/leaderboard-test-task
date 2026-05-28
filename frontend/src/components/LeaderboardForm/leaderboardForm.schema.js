import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getUniqueKey } from "../../utils/getUniqueKey";

export const LEADERBOARD_FORM_FIELDS = {
  NAME: "name",
  ACTION: "action",
  VALUE: "value",
  IDEMPOTENCY_KEY: "idempotencyKey",
};

export const leaderboardFormDefaultValues = () => ({
  [LEADERBOARD_FORM_FIELDS.NAME]: "",
  [LEADERBOARD_FORM_FIELDS.ACTION]: null,
  [LEADERBOARD_FORM_FIELDS.VALUE]: "",
  [LEADERBOARD_FORM_FIELDS.IDEMPOTENCY_KEY]: getUniqueKey(),
});

const leaderboardFormSchema = z.object({
  [LEADERBOARD_FORM_FIELDS.NAME]: z.string().min(1, "Name is required").trim(),
  [LEADERBOARD_FORM_FIELDS.ACTION]: z
    .object(
      {
        value: z.enum(["update", "rewrite"]),
        label: z.string(),
      },
      { required_error: "Action is required" },
    )
    .nullable()
    .refine((val) => val !== null, {
      message: "Action is required",
    }),
  [LEADERBOARD_FORM_FIELDS.VALUE]: z
    .string()
    .min(1, "Value is required")
    .refine((val) => !isNaN(Number(val)), {
      message: "Value must be a number",
    }),
  [LEADERBOARD_FORM_FIELDS.IDEMPOTENCY_KEY]: z.string(),
});

export const leaderboardFormResolver = zodResolver(leaderboardFormSchema);
