import styles from "./tableColumn.module.css";

export const TableColumn = ({ children }) => {
  return <td className={styles.td}>{children}</td>;
};
