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

const SALT = 3;

class UserService implements IUserService {
  async register(user: IUser) {
    const { email, username, password } = user;
    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ username });

    if (userEmail || userName) {
      throw AppError.BadRequest("User with email or username already exists");
    }

    const hashPassword = await bcrypt.hash(password, SALT);
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const userDto = new UserDto(newUser);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(newUser._id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(userData: ILogin) {
    const { email, password } = userData;
    const user = await User.findOne({ email });
    if (!user) {
      throw AppError.BadRequest("User not found");
    }

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch) {
      throw AppError.BadRequest("Password is incorrect");
    }

    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });

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
      throw AppError.BadRequest("No such user exists");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export default new UserService();
