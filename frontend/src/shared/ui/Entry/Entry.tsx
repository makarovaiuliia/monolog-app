import { Moods } from "@/shared/types/mood";
import styles from "./Entry.module.css";
import cn from "clsx";

interface Props {
  title: string;
  body: string;
  mood: Moods;
}

export const Entry = ({ title, body, mood }: Props) => {
  return (
    <article className={cn(styles.root, styles[mood])}>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{body}</p>
      </div>
      <div className={styles.mood}></div>
    </article>
  );
};
