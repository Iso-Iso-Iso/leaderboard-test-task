import { useId } from "react";
import { Tooltip } from "../Tooltip/Tooltip";
import styles from "./InfoIcon.module.css";

export const InfoIcon = ({ tooltipText }) => {
  const tooltipId = useId();

  return (
    <div className={styles.wrapper}>
      <div className={styles.icon} data-tooltip-id={tooltipId}>
        i
      </div>
      <Tooltip id={tooltipId} content={tooltipText} />
    </div>
  );
};
