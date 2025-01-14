import { Request, Response, NextFunction } from "express";
import AppError from "../exceptions/api-error-handler";
export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);
  if (err instanceof AppError) {
    const { statusCode, errors, message } = err;
    return res.status(statusCode).json({ message: message, errors: errors });
  }
  return res.status(500).json({message: 'Server error'})
}
