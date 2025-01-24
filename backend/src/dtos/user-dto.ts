import { Types } from "mongoose";

export default class UserDto {
  email: string;
  username: string;
  id: Types.ObjectId;

  constructor(model: { email: string; _id: any; username: string }) {
    this.email = model.email;
    this.username = model.email;
    this.id = model._id as Types.ObjectId;
  }
}
