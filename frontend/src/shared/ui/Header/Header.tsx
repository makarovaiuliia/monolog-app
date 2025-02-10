"use client";
import styles from "./Header.module.css";
import Image from "next/image";
import cn from "clsx";
import { ReactNode } from "react";
import { Logo } from "../Logo/Logo";
import { logout } from "@/shared/lib/logout";
import { useRouter } from "next/navigation";

interface Props {
  isFullScreen?: boolean;
  title: string;
  subtitle?: string | ReactNode;
  children?: ReactNode;
  greetings?: string;
  // handleLogout: () => void;
}

export const Header = ({
  isFullScreen,
  title,
  subtitle,
  children,
  greetings,
}: // handleLogout,
Props) => {
  return (
    <header className={cn(styles.root, isFullScreen && styles.fullScreen)}>
      <div className={styles.logoBox}>
        <Logo />
        <Image
          alt="settings icon"
          src="/settings.svg"
          width={24}
          height={24}
          onClick={() => {}}
        />
      </div>
      <div className={styles.info}>
        <p className={styles.subtitle}>{subtitle}</p>
        <div>
          {greetings && <h1 className={styles.title}>{greetings}</h1>}
          <h2 className={styles.title}>{title}</h2>
        </div>
        {children}
      </div>
    </header>
  );
};
