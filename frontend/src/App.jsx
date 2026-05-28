import styles from "./App.module.css";
import { LeaderboardForm } from "@components/LeaderboardForm/LeaderboardForm";
import { LeaderboardTable } from "@components/LeaderboardTable/LeaderboardTable";

function App() {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <LeaderboardForm />
        <LeaderboardTable />
      </div>
    </div>
  );
}

export default App;
