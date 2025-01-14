import mongoose, { Model, Schema } from "mongoose";
import { ITokenDocument } from "../types/token";

const tokenSchema: Schema<ITokenDocument> = new mongoose.Schema({
  refreshToken: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const TokenModel: Model<ITokenDocument> = mongoose.model<ITokenDocument>(
  "Token",
  tokenSchema
);

export default TokenModel;
