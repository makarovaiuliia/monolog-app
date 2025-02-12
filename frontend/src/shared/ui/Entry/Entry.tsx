import { Moods } from "@/shared/types/mood";
import styles from "./Entry.module.css";
import cn from "clsx";
import { useState } from "react";
import Image from "next/image";

interface Props {
  title: string;
  body: string;
  mood: Moods;
  id: string;
  handleDelete: (id: string) => void;
}

export const Entry = ({ title, body, mood, id, handleDelete }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSwiped, setIsSwiped] = useState<boolean>(false);
  const [startTouch, setStartTouch] = useState<number>(0);

  const handleClick = () => {
    if (isSwiped) {
      setIsSwiped(false);
      return;
    }
    setIsOpen((prev) => !prev);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartTouch(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startTouch) return;
    const swipeOffsetNew = startTouch - e.touches[0].clientX;
    if (swipeOffsetNew < 100 || swipeOffsetNew < 0) return;
    setIsSwiped(true);
  };

  const handleTouchEnd = () => {
    setStartTouch(0);
  };

  return (
    <>
      <article
        className={cn(
          styles.root,
          styles[mood],
          isOpen && styles.open,
          isSwiped && styles.swiped
        )}
        onClick={handleClick}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.info}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.text}>{body}</p>
        </div>
        <div className={styles.mood}></div>
      </article>
      <div
        className={cn(styles.delete, isSwiped && styles.swiped)}
        onClick={() => handleDelete(id)}
      >
        <Image src={"/delete.svg"} alt="delete" width={35} height={35} />
      </div>
    </>
  );
};
