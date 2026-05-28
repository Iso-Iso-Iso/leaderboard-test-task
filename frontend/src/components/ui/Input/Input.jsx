import clsx from 'clsx';
import { useController } from 'react-hook-form';
import styles from './Input.module.css';

export const Input = ({
  control,
  name,
  label,
  placeholder,
  disabled = false,
  type = 'text',
}) => {
  const {
    field: { value = '', onChange, onBlur, ref },
    fieldState: { error },
  } = useController({ control, name });

  return (
    <div className={clsx(styles.container, { [styles.errorState]: error })}>
      {label && <label className={styles.label}>{label}</label>}
      
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
      
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
};
