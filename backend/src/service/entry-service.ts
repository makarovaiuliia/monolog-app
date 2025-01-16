import User from "../models/User";
import AppError from "../exceptions/api-error-handler";
import Entry from "../models/Entry";
import { IEntry, IEntryDocument, Moods } from "../types/entry";

export interface IEntryService {
  getAllEntries(userId: string): Promise<IEntryDocument[]>;
  getEntryById(entryId: string): Promise<IEntryDocument>;
  addEntry(entry: IEntry, userId: string): Promise<IEntryDocument>;
  editEntry(entry: Partial<IEntry>, entryId: string): Promise<IEntryDocument>;
}

class EntryService implements IEntryService {
  async getAllEntries(userId: string) {
    try {
      const entries = await Entry.find({ userId }).exec();
      return entries;
    } catch (err) {
      throw AppError.BadRequest("No entries were found");
    }
  }

  async getEntryById(entryId: string) {
    try {
      const entry = await Entry.findById(entryId);
      if (!entry) {
        throw AppError.BadRequest("No entry with this id");
      }
      return entry;
    } catch (err) {
      throw AppError.BadRequest("No entry with this id");
    }
  }

  async addEntry(entry: IEntry, userId: string) {
    const { title, content, mood } = entry;

    const user = await User.findById(userId);

    if (!user) {
      throw AppError.BadRequest("User not found");
    }

    if (!Object.values(Moods).includes(mood)) {
      throw AppError.BadRequest("Invalid mood value");
    }

    const newEntry = await Entry.create({
      title,
      content,
      mood,
      userId,
    });

    return newEntry;
  }

  async editEntry(entry: IEntry, entryId: string) {
    const { mood } = entry;

    if (!Object.values(Moods).includes(mood)) {
      throw AppError.BadRequest("Invalid mood value");
    }

    const updatedEntry = await Entry.findByIdAndUpdate(entryId, entry, {
      new: true,
      runValidators: true,
    });

    if (!updatedEntry) {
      throw AppError.BadRequest(`Entry with ID ${entryId} not found.`);
    }

    return updatedEntry;
  }
}

export default new EntryService();
