export default class AppError extends Error {
  statusCode: number;
  errors?: unknown[];

  constructor(statusCode: number, message: string, errors: unknown[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    Object.setPrototypeOf(this, AppError.prototype);
  }

  static UnauthorizedError() {
    return new AppError(401, "User not authorized");
  }

  static BadRequest(message: string, errors?: unknown[]) {
    return new AppError(400, message, errors);
  }
}
