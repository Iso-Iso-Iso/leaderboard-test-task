import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const LEADERBOARD_FORM_FIELDS = {
  NAME: "name",
  ACTION: "action",
  VALUE: "value",
};

export const leaderboardFormDefaultValues = {
  [LEADERBOARD_FORM_FIELDS.NAME]: "",
  [LEADERBOARD_FORM_FIELDS.ACTION]: null,
  [LEADERBOARD_FORM_FIELDS.VALUE]: "",
};

const leaderboardFormSchema = z.object({
  [LEADERBOARD_FORM_FIELDS.NAME]: z
    .string()
    .min(1, "Name is required")
    .trim(),
  [LEADERBOARD_FORM_FIELDS.ACTION]: z
    .object(
      {
        value: z.enum(["update", "rewrite"]),
        label: z.string(),
      },
      { required_error: "Action is required" }
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
});

export const leaderboardFormResolver = zodResolver(leaderboardFormSchema);
