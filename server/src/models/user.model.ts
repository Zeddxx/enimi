import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/auth.types";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: {type: String, required: false, default: "/assets/user-placeholder.png" },
  verified: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
