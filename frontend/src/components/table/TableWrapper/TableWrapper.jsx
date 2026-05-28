import styles from "./tableWrapper.module.css";

export const TableWrapper = ({ headerItems = [], children, bodyStyle, headerRowClass }) => {
  return (
    <div className={styles.tableContainer}>
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
