import { Schema, model, models } from "mongoose";

import { UserAvatar } from "./avatar";

const avatarSchema = new Schema<UserAvatar>(
  {
    user: { type: String, required: true, ref: "User" },
    name: { type: String, require: true },
    image: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

export const Avatar = models.Avatar || model("Avatar", avatarSchema);
