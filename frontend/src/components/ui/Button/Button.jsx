import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = ({
  disabled = false,
  onClick,
  children,
  fullWidth = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.button, fullWidth && styles.fullWidth)}
    >
      {children}
    </button>
  );
};
