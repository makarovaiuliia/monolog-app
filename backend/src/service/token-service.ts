import jwt from "jsonwebtoken";
import TokenModel from "../models/Token";
import { Document, Types } from "mongoose";
import { ITokenDocument, ITokens } from "../types/token";

export interface ITokenService {
  generateTokens(payload: { email: string; id: Types.ObjectId }): ITokens;
  saveToken(
    userId: Types.ObjectId,
    refreshToken: string
  ): Promise<
    Document<unknown, {}, ITokenDocument> &
      ITokenDocument &
      Required<{
        _id: unknown;
      }> & {
        __v: number;
      }
  >;
}

class TokenService implements ITokenService {
  generateTokens(payload: { email: string; id: Types.ObjectId }) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "30m",
      }
    );

    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET as string,
      {
        expiresIn: "30d",
      }
    );

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
}

export default new TokenService();
