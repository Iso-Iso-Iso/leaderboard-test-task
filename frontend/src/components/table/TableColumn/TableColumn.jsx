import clsx from "clsx";
import styles from "./tableColumn.module.css";

export const TableColumn = ({ children, className }) => {
  return <td className={clsx(styles.td, className)}>{children}</td>;
};
