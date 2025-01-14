import { Document, Types } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserDto {
  email: string;
  id: Types.ObjectId;
}
