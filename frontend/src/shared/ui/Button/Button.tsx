import styles from "./Button.module.css";
import Image from "next/image";
import cn from "clsx";

interface Props {
  icon?: boolean;
  text: string;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
}

export const Button = ({ icon, text, onClick, type }: Props) => {
  return (
    <button
      className={cn(styles.root, icon && styles.withIcon)}
      onClick={onClick}
      type={type}
    >
      <p>{text}</p>
      {icon && (
        <Image alt="arrow icon" src="/arrow.svg" width={24} height={24} />
      )}
    </button>
  );
};
