import styles from "./Header.module.css";
import Image from "next/image";
import cn from "clsx";
import { ReactNode } from "react";
import { Logo } from "../Logo/Logo";

interface Props {
  isFullScreen?: boolean;
  onSettingsClick?: () => void;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  greetings?: string;
}

export const Header = ({
  isFullScreen,
  onSettingsClick,
  title,
  subtitle,
  children,
  greetings,
}: Props) => {
  return (
    <header className={cn(styles.root, isFullScreen && styles.fullScreen)}>
      <div className={styles.logoBox}>
        <Logo />
        {onSettingsClick && (
          <Image
            alt="settings icon"
            src="/settings.svg"
            width={24}
            height={24}
            onClick={onSettingsClick}
          />
        )}
      </div>
      <div className={styles.info}>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        <div>
          {greetings && <h1 className={styles.title}>{greetings}</h1>}
          <h2 className={styles.title}>{title}</h2>
        </div>
        {children}
      </div>
    </header>
  );
};
