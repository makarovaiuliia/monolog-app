"use client";

import { observer } from "mobx-react-lite";
import { addEntryApi } from "../../api/addEntry";
import { authStore } from "@/features/auth/model/authStore";
import { Button } from "@/shared/ui/Button/Button";
import cn from "clsx";

import styles from "./AddEntryForm.module.css";
import { formatDate } from "@/features/entryList/model/formatDate";
import { Moods } from "@/shared/types/mood";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loader from "@/shared/ui/Loader/Loader";

interface AddEntryFormData {
  title: string;
  content: string;
  mood: Moods;
}

export const AddEntryForm = observer(() => {
  const { user, accessToken } = authStore;
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddEntryFormData>({
    defaultValues: {
      title: "",
      content: "",
      mood: Moods.HAPPY,
    },
  });

  const selectedMood = watch("mood");

  const onSubmit = async (data: AddEntryFormData) => {
    if (!user || !accessToken) return;
    try {
      setLoading(true);
      await addEntryApi(user.id, accessToken, data);
      setLoading(false);
      router.push("/");
    } catch (err) {
      console.error("Error adding entry:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.root} noValidate>
      <p className={styles.subtitle}>Mood log</p>
      <ul className={styles.moodList}>
        {Object.values(Moods).map((mood) => (
          <li
            key={mood}
            className={styles.moodItem}
            onClick={() => setValue("mood", mood)}
          >
            <div
              className={cn(styles.mood, styles[mood], {
                [styles.selected]: selectedMood === mood,
              })}
            ></div>
            <p className={styles.moodText}>{mood}</p>
          </li>
        ))}
      </ul>

      <p className={styles.subtitle}>{`My note - ${formatDate(
        new Date().toString()
      )}`}</p>

      <Controller
        name="title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <input
            {...field}
            type="text"
            className={styles.input}
            placeholder="Title"
          />
        )}
      />
      {errors.title && <p className={styles.error}>{errors.title.message}</p>}

      <Controller
        name="content"
        control={control}
        rules={{ required: "Content is required" }}
        render={({ field }) => (
          <textarea
            {...field}
            className={styles.textarea}
            placeholder="Share your thoughts"
          />
        )}
      />
      {errors.content && (
        <p className={styles.error}>{errors.content.message}</p>
      )}

      <Button type="submit" text="Submit" />
    </form>
  );
});
