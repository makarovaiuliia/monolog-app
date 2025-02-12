import { IEntry } from "@/shared/types/entry";
import styles from "./EntryList.module.css";
import { Entry } from "@/shared/ui/Entry/Entry";

interface Props {
  list: Record<string, IEntry[]>;
}

export const EntryList = ({ list }: Props) => {
  return (
    <ul className={styles.root}>
      {Object.entries(list).map(([date, entries]) => (
        <li key={date}>
          <p className={styles.date}>{date}</p>
          <ul className={styles.entryGroup}>
            {entries.map((entry) => (
              <li key={entry._id}>
                <Entry
                  title={entry.title}
                  mood={entry.mood}
                  body={entry.content}
                />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
