import styles from "./Input.module.css";
import { ChangeEvent, useState } from "react";

interface Props {
  placeholder?: string;
}
export const Input = ({ placeholder }: Props) => {
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <input
      value={value}
      onChange={handleChange}
      className={styles.root}
      placeholder={placeholder ?? undefined}
    />
  );
};
