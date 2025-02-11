"use client";

import { authStore } from "@/features/auth/model/authStore";
import { observer } from "mobx-react-lite";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/shared/ui/Loader/Loader";
import { AuthForm } from "@/features/auth/ui/AuthForm/AuthForm";
import { Header } from "@/shared/ui/Header/Header";
import Link from "next/link";

interface Props {
  isSignUp?: boolean;
}

export const AuthPageWidget = observer(({ isSignUp }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const refreshToken = useCallback(async () => {
    try {
      if (!authStore.accessToken) {
        await authStore.refreshToken();
        router.push("/");
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  if (loading) {
    return <Loader />;
  }

  const renderHeader = () => {
    const isSignUpMode = isSignUp;
    const title = isSignUpMode
      ? "Sign up for monolog"
      : "Log into your account";
    const linkText = isSignUpMode ? "Log in" : "Sign up";
    const linkHref = isSignUpMode ? "/sign-in" : "/sign-up";
    const message = isSignUpMode
      ? "Already have an account? "
      : "New to monolog? ";

    return (
      <Header
        title={title}
        subtitle={
          <>
            {message}
            <Link
              style={{ fontWeight: "600", cursor: "pointer" }}
              href={linkHref}
            >
              {linkText}
            </Link>
          </>
        }
      />
    );
  };

  return (
    <>
      {renderHeader()}
      <AuthForm isSignUp={isSignUp} />
    </>
  );
});
