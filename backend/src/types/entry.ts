import mongoose, { Document } from "mongoose";

interface IEntry {
  userId: mongoose.Types.ObjectId;
  content?: string;
  title?: string;
  mood?: string;
  date?: Date;
}

export interface IEntryDocument extends IEntry, Document {}
