import User from "../models/User";
import bcrypt from "bcrypt";
import tokenService from "./token-service";
import UserDto from "../dtos/user-dto";
import { ITokens } from "../types/token";
import { IUser, IUserDto } from "../types/user";

export interface IUserService {
  register(user: IUser): Promise<ITokens & { user: IUserDto }>;
}

const SALT = 3;

class UserService implements IUserService {
  async register(user: IUser) {
    const { email, username, password } = user;
    const userEmail = await User.findOne({ email });
    const userName = await User.findOne({ username });

    if (userEmail || userName) {
      throw new Error(`User with email or username already exists`);
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
}

export default new UserService();
