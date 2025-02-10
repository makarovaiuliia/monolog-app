"use client";

import { authStore } from "@/features/auth/model/authStore";
import { IEntry } from "@/shared/types/entry";
import { observer } from "mobx-react-lite";
import { useEffect, useState, useCallback } from "react";
import { redirect } from "next/navigation";
import { fetchListApi } from "@/features/entryList/api/fetchList";
import { Header } from "@/shared/ui/Header/Header";
import { EntryList } from "@/features/entryList/ui/EntryList";
import { Error } from "@/shared/ui/Error/Error";
import { Button } from "@/shared/ui/Button/Button";
import { formatDate } from "@/features/entryList/model/formatDate";
import Loader from "@/shared/ui/Loader/Loader";

const groupEntriesByDate = (entries: IEntry[]): Record<string, IEntry[]> =>
  entries.reduce((acc, entry) => {
    const date = formatDate(entry.date.split("T")[0]);
    (acc[date] ??= []).push(entry);
    return acc;
  }, {} as Record<string, IEntry[]>);

export const MainPageWidget = observer(() => {
  const [list, setList] = useState<Record<string, IEntry[]>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const fetchList = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await fetchListApi(userId, accessToken);
      setList(groupEntriesByDate(response));
    } catch (err: any) {
      setError(err.message ?? "An error occurred");
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      setLoading(true);
      if (!authStore.accessToken) {
        await authStore.refreshToken();
      }
      if (authStore.user && authStore.accessToken) {
        fetchList(authStore.user.id, authStore.accessToken);
      }
    } catch {
      redirect("/sign-in");
    } finally {
      setLoading(false);
    }
  }, [fetchList]);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  const renderHeaderWithButton = (isFullScreen: boolean = false) => (
    <Header
      title="How do you feel today? Share your feelings in a personal diary"
      subtitle="Daily reflection"
      greetings={
        authStore.user
          ? `Hello, ${authStore.user?.username}\u00A0💛`
          : undefined
      }
      isFullScreen={isFullScreen}
    >
      <Button
        onClick={() => redirect("/add")}
        text="Your reflection"
        icon={true}
      />
    </Header>
  );

  if (loading) {
    return <Loader />;
  }

  if (!authStore.user) {
    return;
  }

  if (error) {
    return (
      <Error
        userName={authStore.user?.username ?? "User"}
        onRetry={refreshToken}
      />
    );
  }

  if (Object.keys(list).length === 0) {
    return renderHeaderWithButton(true);
  }

  return (
    <main>
      {renderHeaderWithButton()}
      <EntryList list={list} />
    </main>
  );
});
