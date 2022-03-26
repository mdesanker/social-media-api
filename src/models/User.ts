import { Schema, model } from "mongoose";
import { DateTime } from "luxon";

export interface IUser {
  _id?: string;
  provider?: string;
  googleId?: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  date: DateTime;
}

const UserSchema = new Schema<IUser>({
  provider: { type: String },
  googleId: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  date: { type: Date, default: DateTime.now },
});

export default model("User", UserSchema);
