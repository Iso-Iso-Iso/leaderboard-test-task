import clsx from "clsx";
import styles from "./Typography.module.css";

export const Typography = ({ variant = "paragraph", text }) => {
  return (
    <span className={clsx(styles.typography, styles[variant])}>{text}</span>
  );
};
