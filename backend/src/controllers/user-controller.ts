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
  // private validateRequest(req: Request, next: NextFunction): void {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     throw AppError.BadRequest("Validation Error", errors.array());
  //   }
  // }

  // private setRefreshTokenCookie(res: Response, token: string): void {
  //   res.cookie("refreshToken", token, {
  //     maxAge: MAX_AGE,
  //     httpOnly: true,
  //     secure: true,
  //   });
  // }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw AppError.BadRequest("Validation Error", errors.array());
      }
      const userData = await userService.register(req.body);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: true,
      });
      res.status(201).json(userData);
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
      res.status(201).json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw AppError.BadRequest("No refresh token provided");
      }
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
      if (!refreshToken) {
        throw AppError.BadRequest("No refresh token provided");
      }
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: MAX_AGE,
        httpOnly: true,
        secure: true,
      });
      res.status(201).json(userData);
    } catch (err) {
      next(err);
    }
  }
}

export default new UserController();
