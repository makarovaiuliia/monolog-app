import styles from "./Button.module.css";
import Image from "next/image";
import cn from "clsx";

interface Props {
  icon?: boolean;
  text: string;
  onClick?: () => void;
}

export const Button = ({ icon, text, onClick }: Props) => {
  return (
    <button
      className={cn(styles.root, icon && styles.withIcon)}
      onClick={onClick}
    >
      <p>{text}</p>
      {icon && (
        <Image alt="arrow icon" src="/arrow.svg" width={24} height={24} />
      )}
    </button>
  );
};
