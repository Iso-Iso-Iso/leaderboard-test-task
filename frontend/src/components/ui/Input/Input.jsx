import clsx from "clsx";
import { useController } from "react-hook-form";
import { InfoIcon } from "../InfoIcon/InfoIcon";
import styles from "./Input.module.css";

export const Input = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
}) => {
  const {
    field: { value = "", onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className={clsx(styles.container, { [styles.errorState]: error })}>
      {(label || error) && (
        <div className={styles.labelWrapper}>
          {label && <label className={styles.label}>{label}</label>}
          {error && <InfoIcon tooltipText={error.message} />}
        </div>
      )}

      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
};
