import mongoose, { Document } from "mongoose";

export interface IEntry {
  content: string;
  title: string;
  mood: Moods;
}

interface IEntryDB extends IEntry {
  userId: mongoose.Types.ObjectId;
  date: Date;
}

export interface IEntryDocument extends IEntryDB, Document {}

export enum Moods {
  HAPPY = "Happy",
  SATISFIED = "Satisfied",
  GOOD = "Good",
  FURIOUS = "Furious",
  UPSET = "Upset",
  DEPRESSED = "Depressed",
}
