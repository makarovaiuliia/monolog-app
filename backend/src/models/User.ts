import mongoose, { Model, Schema } from "mongoose";
import { IUserDocument } from "../types/user";

const userSchema: Schema<IUserDocument> = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
});

const UserModel: Model<IUserDocument> = mongoose.model<IUserDocument>(
  "User",
  userSchema
);

export default UserModel;
