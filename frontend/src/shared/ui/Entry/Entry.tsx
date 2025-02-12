import { Moods } from "@/shared/types/mood";
import styles from "./Entry.module.css";
import cn from "clsx";
import { useState } from "react";

interface Props {
  title: string;
  body: string;
  mood: Moods;
}

export const Entry = ({ title, body, mood }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpenText = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <article
      className={cn(styles.root, styles[mood], isOpen && styles.open)}
      onClick={handleOpenText}
    >
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={cn(styles.text, { [styles.open]: isOpen })}>{body}</p>
      </div>
      <div className={styles.mood}></div>
    </article>
  );
};
