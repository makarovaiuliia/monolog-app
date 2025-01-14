import { Types } from "mongoose";

export default class UserDto {
  email: string;
  id: Types.ObjectId;

  constructor(model: { email: string; _id: any }) {
    this.email = model.email;
    this.id = model._id as Types.ObjectId;
  }
}
