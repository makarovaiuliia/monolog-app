import type { Request, Response, NextFunction } from "express";
import userService from "../service/user-service";
import { validationResult } from "express-validator";
import AppError from "../exceptions/api-error-handler";

interface IUserController {
  register(req: Request, res: Response, next: NextFunction): Promise<void>;
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
  logout(req: Request, res: Response, next: NextFunction): Promise<void>;
  refresh(req: Request, res: Response, next: NextFunction): Promise<void>;
}

const MAX_AGE = 30 * 24 * 60 * 60 * 1000; // 30 days life of token

class UserController implements IUserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(
          AppError.BadRequest("Validation Error", validationErrors.array())
        );
      }
      const userData = await userService.register(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: true,
      });
      res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await userService.login(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: true,
      });
      res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      res.status(200).json();
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: true,
      });
      res.json(userData);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
