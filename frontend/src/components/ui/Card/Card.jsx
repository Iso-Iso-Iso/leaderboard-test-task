import clsx from "clsx";
import styles from "./Card.module.css";

export const Card = ({ children, className }) => {
  return <div className={clsx(styles.card, className)}>{children}</div>;
};
