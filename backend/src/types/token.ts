import { Types, Document } from "mongoose";

interface IToken {
  refreshToken: string;
  user: Types.ObjectId;
}

export interface ITokenDocument extends IToken, Document {}

export interface ITokens {
  refreshToken: string;
  accessToken: string;
}
