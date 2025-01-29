import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import styles from "./Input.module.css";
import cn from "clsx";

interface Props<T extends FieldValues> {
  placeholder?: string;
  type: string;
  register: UseFormRegister<T>;
  label: Path<T>;
  required: boolean;
  validation?: RegisterOptions<T>;
  errorMessage?: string;
}

export const Input = <T extends FieldValues>({
  placeholder,
  type,
  register,
  required,
  label,
  validation,
  errorMessage,
}: Props<T>) => {
  const inputId = `input-${label}`;

  return (
    <div className={styles.root}>
      <input
        className={cn(styles.input, errorMessage && styles.inputWithError)}
        placeholder={placeholder ?? undefined}
        type={type}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${inputId}-error` : undefined}
        {...register(label, { required, ...validation })}
      />
      {errorMessage && (
        <span id={`${inputId}-error`} className={styles.error} role="alert">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
