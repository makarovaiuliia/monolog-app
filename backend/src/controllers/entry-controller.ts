import type { Request, Response, NextFunction } from "express";
import EntryService from "../service/entry-service";

interface IEntryController {
  getAllEntries(req: Request, res: Response, next: NextFunction): Promise<void>;
  getEntryById(req: Request, res: Response, next: NextFunction): Promise<void>;
  addEntry(req: Request, res: Response, next: NextFunction): Promise<void>;
  deleteEntry(req: Request, res: Response, next: NextFunction): Promise<void>;
  editEntry(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class EntryController implements IEntryController {
  async getAllEntries(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const entries = await EntryService.getAllEntries(userId);
      res.status(200).json(entries);
    } catch (err) {
      next(err);
    }
  }

  async getEntryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { entryId } = req.params;
      const entry = await EntryService.getEntryById(entryId);
      res.status(200).json(entry);
    } catch (err) {
      next(err);
    }
  }

  async addEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;

      const entry = await EntryService.addEntry(req.body, userId);
      res.status(200).json({ data: entry });
    } catch (err) {
      next(err);
    }
  }

  async deleteEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const entryId = req.params.entryId;

      const entry = await EntryService.deleteEntry(entryId);
      console.log(entry);

      res.status(200).json({ data: entry });
    } catch (err) {
      next(err);
    }
  }

  async editEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const entryId = req.params.entryId;

      const entry = await EntryService.editEntry(req.body, entryId);
      res.status(200).json({ data: entry });
    } catch (err) {
      next(err);
    }
  }
}

export default new EntryController();
