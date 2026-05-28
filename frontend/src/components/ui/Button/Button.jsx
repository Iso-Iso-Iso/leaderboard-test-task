import clsx from 'clsx';
import styles from './Button.module.css';

export const Button = ({
  disabled = false,
  onClick,
  children,
  variant = 'primary',
  fullWidth = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.button, styles[variant], fullWidth && styles.fullWidth)}
    >
      {children}
    </button>
  );
};
