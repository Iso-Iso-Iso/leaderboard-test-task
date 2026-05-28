import { TableWrapper } from "@components/table/TableWrapper/TableWrapper";
import { TableRow } from "@components/table/TableRow/TableRow";
import { TableColumn } from "@components/table/TableColumn/TableColumn";
import { Card } from "@components/ui/Card/Card";
import { Typography } from "@components/ui/Typography/Typography";
import { IntersectionTrigger } from "@components/IntersectionTrigger/IntersectionTrigger";
import { Loader } from "@components/ui/Loader/Loader";
import { useGetLeaderboardInfiniteQuery } from "@/services/leaderboard/useGetLeaderboardInfiniteQuery";
import styles from "./leaderboardTable.module.css";
import { useRef } from "react";

const HEADER_ITEMS = [{ text: "Rank" }, { text: "Name" }, { text: "Value" }];

export const LeaderboardTable = () => {
  const {
    data: allPositions = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isGetLeaderboardLoading,
    isError,
  } = useGetLeaderboardInfiniteQuery(20);

  const scrollAreaRef = useRef(null);

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <Typography variant="title" text="Current Standings" />
      </div>

      {isGetLeaderboardLoading && (
        <div className={styles.messageState}>
          <Loader />
        </div>
      )}

      {isError && !isGetLeaderboardLoading && (
        <div className={styles.messageState}>
          <Typography
            variant="paragraph"
            text="Error loading standings. Please try again."
          />
        </div>
      )}

      {!isGetLeaderboardLoading && !isError && allPositions.length === 0 && (
        <div className={styles.messageState}>
          <Typography
            variant="paragraph"
            text="No entries yet. Be the first!"
          />
        </div>
      )}

      {!isGetLeaderboardLoading && !isError && allPositions.length > 0 && (
        <div className={styles.scrollWrapper} ref={scrollAreaRef}>
          <TableWrapper headerItems={HEADER_ITEMS}>
            {allPositions.map((row, index) => (
              <TableRow key={row.id || index}>
                <TableColumn>{index + 1}</TableColumn>
                <TableColumn>{row.userName}</TableColumn>
                <TableColumn>{row.value}</TableColumn>
              </TableRow>
            ))}
          </TableWrapper>

          {hasNextPage && (
            <IntersectionTrigger
              scrollAreaRef={scrollAreaRef}
              onIntersect={() => !isFetchingNextPage && fetchNextPage()}
            />
          )}
        </div>
      )}
    </Card>
  );
};
