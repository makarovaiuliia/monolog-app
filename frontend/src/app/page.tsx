import styles from "./page.module.css";
import { MainPageWidget } from "@/widgets/MainPageWidget/MainPageWidget";

export default function Home() {
  return (
    <div className={styles.page}>
      <MainPageWidget />
    </div>
  );
}
