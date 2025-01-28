import styles from "./Input.module.css";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";

interface Props {
  placeholder?: string;
  value: string;
  onChange: (e: any) => void;
  type: string;
}
export const Input = ({ placeholder, value, onChange, type }: Props) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className={styles.root}
      placeholder={placeholder ?? undefined}
      type={type}
    />
  );
};
