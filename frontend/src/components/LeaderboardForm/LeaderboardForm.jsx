import { useForm } from "react-hook-form";
import { Card } from "@components/ui/Card/Card";
import { Typography } from "@components/ui/Typography/Typography";
import { Input } from "@components/ui/Input/Input";
import { FormDropdown } from "@components/ui/Dropdown/Dropdown";
import { Button } from "@components/ui/Button/Button";
import { Loader } from "@components/ui/Loader/Loader";
import {
  LEADERBOARD_FORM_FIELDS,
  leaderboardFormDefaultValues,
  leaderboardFormResolver,
} from "./leaderboardForm.schema";
import styles from "./leaderboardForm.module.css";

import { useCreateOrRewriteLeaderboardMutation } from "@/services/leaderboard/useCreateOrRewriteLeaderboardMutation";
import { useAppendLeaderboardMutation } from "@/services/leaderboard/useAppendLeaderboardMutation";

const ACTION_OPTIONS = [
  { value: "update", label: "Update" },
  { value: "rewrite", label: "Rewrite" },
];

export const LeaderboardForm = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: leaderboardFormResolver,
    defaultValues: leaderboardFormDefaultValues(),
  });

  const {
    mutate: createOrRewriteLeaderboardMutate,
    isPending: isCreateOrRewriteLeaderboardPending,
  } = useCreateOrRewriteLeaderboardMutation();

  const {
    mutate: appendLeaderboardMutate,
    isPending: isAppendLeaderboardPending,
  } = useAppendLeaderboardMutation();

  const actionMap = {
    rewrite: createOrRewriteLeaderboardMutate,
    update: appendLeaderboardMutate,
  };

  const isPending =
    isCreateOrRewriteLeaderboardPending || isAppendLeaderboardPending;

  const onSubmit = (data) => {
    const mutateFn = actionMap[data.action.value];

    const payload = {
      userName: data.name,
      value: Number(data.value),
      idempotencyKey: data.idempotencyKey,
    };

    mutateFn(payload, {
      onSuccess: () => {
        reset(leaderboardFormDefaultValues());
      },
    });
  };

  return (
    <Card>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <Typography variant="title" text="Leaderboard Actions" />
          <Typography
            variant="paragraph"
            text="Enter details below to update or rewrite leaderboard entries."
          />
        </div>

        <div className={styles.rowFields}>
          <div className={styles.fieldWrapper}>
            <Input
              control={control}
              name={LEADERBOARD_FORM_FIELDS.NAME}
              label="Name"
              placeholder="Enter player name..."
              disabled={isPending}
            />
          </div>

          <div className={styles.fieldWrapper}>
            <FormDropdown
              control={control}
              name={LEADERBOARD_FORM_FIELDS.ACTION}
              options={ACTION_OPTIONS}
              label="Action"
              placeholder="Choose action..."
            />
          </div>

          <div className={styles.fieldWrapper}>
            <Input
              control={control}
              name={LEADERBOARD_FORM_FIELDS.VALUE}
              label="Value"
              placeholder="Enter numeric value..."
              disabled={isPending}
            />
          </div>

          <div className={styles.buttonWrapper}>
            <Button
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
              fullWidth
            >
              {isPending ? (
                <div className={styles.loaderWrapper}>
                  <Loader />
                  Submitting...
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
