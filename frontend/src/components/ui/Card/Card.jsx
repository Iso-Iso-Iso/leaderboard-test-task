import clsx from "clsx";
import styles from "./Card.module.css";

export const Card = ({ children, className, rootRef }) => {
  return (
    <div className={clsx(styles.card, className)} ref={rootRef}>
      {children}
    </div>
  );
};
