import { TableWrapper } from "@components/table/TableWrapper/TableWrapper";
import { TableRow } from "@components/table/TableRow/TableRow";
import { TableColumn } from "@components/table/TableColumn/TableColumn";
import { Card } from "@components/ui/Card/Card";
import { Typography } from "@components/ui/Typography/Typography";
import { IntersectionTrigger } from "@components/IntersectionTrigger/IntersectionTrigger";
import { Loader } from "@components/ui/Loader/Loader";
import { useGetLeaderboardInfiniteQuery } from "@/services/leaderboard/useGetLeaderboardInfiniteQuery";
import { Dropdown } from "@components/ui/Dropdown/Dropdown";
import styles from "./leaderboardTable.module.css";
import { useRef, useState } from "react";

const HEADER_ITEMS = [{ text: "Rank" }, { text: "Name" }, { text: "Value" }];

const SORT_OPTIONS = [
  { value: "DESC", label: "Highest first" },
  { value: "ASC", label: "Lowest first" },
];

export const LeaderboardTable = () => {
  const [sortType, setSortType] = useState(SORT_OPTIONS[0]);

  const {
    data: allPositions = [],
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isGetLeaderboardLoading,
    isError,
  } = useGetLeaderboardInfiniteQuery({ limit: 20, sort: sortType.value });

  const scrollAreaRef = useRef(null);

  return (
    <Card className={styles.container}>
      <div className={styles.header}>
        <Typography variant="title" text="Current Standings" />
        <div className={styles.sortDropdownWrapper}>
          <Dropdown
            options={SORT_OPTIONS}
            value={sortType}
            onChange={setSortType}
            placeholder="Sort by..."
          />
        </div>
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
                <TableColumn>{row.rank}</TableColumn>
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
