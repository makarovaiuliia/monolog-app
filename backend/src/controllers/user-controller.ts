import type { Request, Response, NextFunction } from "express";
import userService from "../service/user-service";
import { IUser } from "../types/user";

interface IUserController {
  register(req: Request<IUser>, res: Response, next: NextFunction): void;
}

const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days life of token

class UserController implements IUserController {
  async register(req: Request<IUser>, res: Response, next: NextFunction) {
    try {
      const userData = await userService.register(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: true,
      });
      return res.json(userData);
    } catch (e) {
      console.log(e);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(["123", "123"]);
    } catch (e) {}
  }
}

export default new UserController();
