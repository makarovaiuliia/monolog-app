import jwt from "jsonwebtoken";
import TokenModel from "../models/Token";
import { DeleteResult, Types } from "mongoose";
import { ITokenDocument, ITokens } from "../types/token";

export interface ITokenService {
  generateTokens(payload: { email: string; id: Types.ObjectId }): ITokens;
  saveToken(
    userId: Types.ObjectId,
    refreshToken: string
  ): Promise<ITokenDocument>;
  removeToken(refreshToken: string): Promise<DeleteResult>;
  validateRefreshToken(
    token: string
  ): { email: string; id: Types.ObjectId } | null;
  validateAccessToken(
    token: string
  ): { email: string; id: Types.ObjectId } | null;
  findRefreshToken(refreshToken: string): Promise<ITokenDocument | null>;
}

const REFRESH_TOKEN_LIFE_SPAN = "30d";
const ACCESS_TOKEN_LIFE_SPAN = "30m";

class TokenService implements ITokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  constructor() {
    this.accessSecret = process.env.JWT_ACCESS_SECRET || "";
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || "";

    if (!this.accessSecret || !this.refreshSecret) {
      // throw new Error("JWT secrets are not properly configured");
    }
  }

  private verifyToken(
    token: string,
    secret: string
  ): { email: string; id: Types.ObjectId } | null {
    try {
      return jwt.verify(token, secret) as { email: string; id: Types.ObjectId };
    } catch (err) {
      return null;
    }
  }

  generateTokens(payload: { email: string; id: Types.ObjectId }) {
    const accessToken = jwt.sign(payload, this.accessSecret, {
      expiresIn: ACCESS_TOKEN_LIFE_SPAN,
    });

    const refreshToken = jwt.sign(payload, this.refreshSecret, {
      expiresIn: REFRESH_TOKEN_LIFE_SPAN,
    });

    return {
      refreshToken,
      accessToken,
    };
  }

  async saveToken(userId: any, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    return TokenModel.deleteOne({ refreshToken });
  }

  validateAccessToken(
    token: string
  ): { email: string; id: Types.ObjectId } | null {
    return this.verifyToken(token, this.accessSecret);
  }

  validateRefreshToken(
    token: string
  ): { email: string; id: Types.ObjectId } | null {
    return this.verifyToken(token, this.refreshSecret);
  }

  async findRefreshToken(refreshToken: string): Promise<ITokenDocument | null> {
    return TokenModel.findOne({ refreshToken });
  }
}

export default new TokenService();
