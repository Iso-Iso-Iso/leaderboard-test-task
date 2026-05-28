import clsx from "clsx";
import { useController } from "react-hook-form";
import Select from "react-select";
import { InfoIcon } from "../InfoIcon/InfoIcon";
import styles from "./Dropdown.module.css";

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  error,
}) => {
  return (
    <div className={clsx(styles.container, { [styles.errorState]: error })}>
      {(label || error) && (
        <div className={styles.labelWrapper}>
          {label && <label className={styles.label}>{label}</label>}
          {error && <InfoIcon tooltipText={error.message} />}
        </div>
      )}

      <Select
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        classNamePrefix="dropdown"
        isSearchable={false}
      />
    </div>
  );
};

export const FormDropdown = ({
  options,
  control,
  name,
  placeholder,
  label,
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <Dropdown
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      label={label}
      error={error}
    />
  );
};
