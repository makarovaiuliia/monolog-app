import AppError from "../exceptions/api-error-handler";

export default function errorMiddleware(
  err: any,
  req: any,
  res: any,
  next: any
) {
  console.log(err);

  if (Object.getPrototypeOf(err) === AppError.prototype) {
    const { statusCode, errors, message } = err;
    return res.status(statusCode).json({ message, errors });
  }
  return res.status(500).json({ message: "Internal server error" });
}
