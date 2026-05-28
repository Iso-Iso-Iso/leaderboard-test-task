import clsx from "clsx";
import styles from "./tableWrapper.module.css";

export const TableWrapper = ({ headerItems = [], children, className, bodyStyle, headerRowClass }) => {
  return (
    <div className={clsx(styles.tableContainer, className)}>
      <table className={styles.table}>
        <thead>
          <tr className={headerRowClass}>
            {headerItems.map((item, index) => (
              <th key={index} className={styles.th}>
                {item.text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody style={bodyStyle} className={styles.tbody}>{children}</tbody>
      </table>
    </div>
  );
};
