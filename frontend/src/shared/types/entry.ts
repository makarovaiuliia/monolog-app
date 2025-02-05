import { Moods } from "./mood";

export interface IEntry {
  id: string;
  content: string;
  title: string;
  mood: Moods;
  userId: string;
  date: string;
}
