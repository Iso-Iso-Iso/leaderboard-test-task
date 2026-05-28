import clsx from "clsx";
import styles from "./tableRow.module.css";

export const TableRow = ({ children, className }) => {
  return <tr className={clsx(styles.tr, className)}>{children}</tr>;
};
