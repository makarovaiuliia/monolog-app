import mongoose, { Schema, Document, Model } from "mongoose";
import { IEntryDocument } from "../types/entry";

const entrySchema: Schema<IEntryDocument> = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String },
  title: { type: String },
  mood: { type: String },
  date: { type: Date, default: Date.now },
});

const EntryModel: Model<IEntryDocument> = mongoose.model<IEntryDocument>(
  "Entry",
  entrySchema
);

export default EntryModel;
