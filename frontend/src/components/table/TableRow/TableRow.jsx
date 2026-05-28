import clsx from "clsx";
import styles from "./tableRow.module.css";

export const TableRow = ({ children, className, rowRef, style, dataIndex }) => {
  return (
    <tr ref={rowRef} className={clsx(styles.tr, className)} style={style} data-index={dataIndex}>
      {children}
    </tr>
  );
};
