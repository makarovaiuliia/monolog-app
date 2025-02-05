import { IEntry } from "@/shared/types/entry";
import { observer } from "mobx-react-lite";
import styles from "./EntryList.module.css";
import { Entry } from "@/shared/ui/Entry/Entry";

interface Props {
  list: Record<string, IEntry[]>;
}

export const EntryList = observer(({ list }: Props) => {
  // maka@gmail.com
  return (
    <ul className={styles.root}>
      {Object.entries(list).map(([date, entries]) => (
        <li key={date}>
          <p className={styles.date}>{date}</p>
          <ul className={styles.entryGroup}>
            {entries.map((entry) => (
              <Entry
                title={entry.title}
                body={entry.content}
                mood={entry.mood}
                key={entry.id}
              />
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
});
