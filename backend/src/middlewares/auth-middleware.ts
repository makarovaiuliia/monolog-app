import { Request } from "express";
import AppError from "../exceptions/api-error-handler";
import tokenService from "../service/token-service";

export default function (req: Request, res: any, next: any) {
  try {
    const authorizationHeader = req.headers.authorizationHeader;
    if (!authorizationHeader) {
      return next(AppError.UnauthorizedError());
    }
    const accessToken = Array.isArray(authorizationHeader)
      ? null
      : authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(AppError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(AppError.UnauthorizedError());
    }

    next();
  } catch (err) {
    return next(AppError.UnauthorizedError());
  }
}
