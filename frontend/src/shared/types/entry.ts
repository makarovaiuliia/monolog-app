import { Moods } from "./mood";

export interface IEntry {
  _id: string;
  content: string;
  title: string;
  mood: Moods;
  userId: string;
  date: string;
}
