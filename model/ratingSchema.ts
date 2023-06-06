import { Schema, model, models } from "mongoose";

import { Rating } from "./rating";

const favoritesSchema = new Schema<Rating>(
  {
    user: { type: String, required: true, ref: "User" },
    id: { type: Number, require: true },
    rating: { type: Number, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const MediaRating = models.Rating || model("Rating", favoritesSchema);
