import { Schema, model, models } from "mongoose";

import { NextAuthUser } from "../types/interfaces";

const userSchema = new Schema<NextAuthUser>(
  {
    uid: { type: String, require: true },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    image: { type: String, require: true },
    emailVerified: { type: Boolean, require: true },
    authTime: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model<NextAuthUser>("User", userSchema);
