export default class AppError extends Error {
  statusCode: number;
  errors?: Error[];

  constructor(statusCode: number, message: string, errors: Error[] = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new AppError(401, "User not authorized");
  }

  static BadRequest(message: string, errors: Error[]) {
    return new AppError(400, message, errors);
  }
}
