"use client";
import styles from "./Header.module.css";
import Image from "next/image";
import cn from "clsx";
import { ReactNode, useState } from "react";
import { Logo } from "../Logo/Logo";
import { logout } from "@/shared/lib/logout";
import { useRouter } from "next/navigation";
import { observer } from "mobx-react-lite";
import { authStore } from "@/features/auth/model/authStore";
import Loader from "../Loader/Loader";

interface Props {
  isFullScreen?: boolean;
  title: string;
  subtitle?: string | ReactNode;
  children?: ReactNode;
  greetings?: string;
  withSettings?: boolean;
}

export const Header = observer(
  ({
    isFullScreen,
    title,
    subtitle,
    children,
    greetings,
    withSettings,
  }: Props) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
      if (authStore.accessToken) {
        try {
          setLoading(true);
          logout(authStore.accessToken);
        } catch {
        } finally {
          setLoading(false);
          router.push("/sign-in");
          authStore.logout();
        }
      }
    };

    if (loading) {
      return <Loader />;
    }

    return (
      <header className={cn(styles.root, isFullScreen && styles.fullScreen)}>
        <div className={styles.logoBox}>
          <Logo />
          {withSettings && (
            <Image
              alt="settings icon"
              src="/settings.svg"
              width={24}
              height={24}
              onClick={handleLogout}
              className={styles.settings}
            />
          )}
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
  }
);
