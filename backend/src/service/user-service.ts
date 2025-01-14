import User from "../models/User";
import bcrypt from "bcrypt";
import tokenService from "./token-service";
import UserDto from "../dtos/user-dto";
import { ITokens } from "../types/token";
import { ILogin, IUser, IUserDto } from "../types/user";
import AppError from "../exceptions/api-error-handler";
import UserModel from "../models/User";

export interface IUserService {
  register(user: IUser): Promise<ITokens & { user: IUserDto }>;
  login(user: ILogin): Promise<ITokens & { user: IUserDto }>;
  logout(refreshToken: string): Promise<void>;
  refresh(refreshToken: string): Promise<ITokens & { user: IUserDto }>;
}

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

class UserService implements IUserService {
  private async checkUserExists(
    email: string,
    username: string
  ): Promise<void> {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      throw AppError.BadRequest("User with email or username already exists");
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  private async validatePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<void> {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    if (!isMatch) {
      throw AppError.BadRequest("Password is incorrect");
    }
  }

  async register(user: IUser) {
    const { email, username, password } = user;

    await this.checkUserExists(email, username);

    const hashedPassword = await this.hashPassword(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(newUser._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(userData: ILogin) {
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
      throw AppError.BadRequest("User not found");
    }

    await this.validatePassword(password, user.password);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    await tokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw AppError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findRefreshToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw AppError.UnauthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    if (!user) {
      throw AppError.BadRequest("User not found");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export default new UserService();
