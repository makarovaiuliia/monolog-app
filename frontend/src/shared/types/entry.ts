import { Moods } from "./mood";

export interface IEntry {
  content: string;
  title: string;
  mood: Moods;
  userId: string;
  date: string;
}
