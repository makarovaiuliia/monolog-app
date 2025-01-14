import { Document, Types } from "mongoose";

export interface ILogin {
  email: string;
  password: string;
}
export interface IUser extends ILogin {
  username: string;
}

export interface IUserDocument extends IUser, Document {}

export interface IUserDto {
  email: string;
  id: Types.ObjectId;
}
