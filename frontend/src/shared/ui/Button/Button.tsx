import { Moods } from "@/shared/types/mood";
import styles from "./Button.module.css";
import cn from "clsx";

interface Props {
  icon?: boolean;
  text: string;
  onClick?: () => void;
}

export const Button = ({ icon, text, onClick }: Props) => {
  return (
    <button className={cn(styles.root)} onClick={onClick}>
      {text}
    </button>
  );
};
