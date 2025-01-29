"use client";

import { IEntry } from "@/shared/types/entry";
import { useEffect, useState } from "react";

const groupEntriesByDate = (entries: IEntry[]) => {
  return entries.reduce<Record<string, IEntry[]>>((acc, entry) => {
    const date = entry.date.split("T")[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(entry);
    return acc;
  }, {});
};

export const EntryList = () => {
  const [list, setList] = useState<Array<IEntry>>([]);

  useEffect(() => {
    const fetchList = async () => {
      
    };
  }, []);

  return <div></div>;
};
