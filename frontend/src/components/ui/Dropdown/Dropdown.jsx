import clsx from "clsx";
import { useController } from "react-hook-form";
import Select from "react-select";
import styles from "./Dropdown.module.css";

export const Dropdown = ({
  options,
  control,
  name,
  placeholder = "Select an option...",
  label,
  disabled = false,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className={clsx(styles.container, { [styles.errorState]: error })}>
      {label && <label className={styles.label}>{label}</label>}

      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={disabled}
        classNamePrefix="dropdown"
        isSearchable={false}
      />

      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
