import { Schema, model, models } from "mongoose";

import { Movie } from "./movie";
import { Serial } from "./serial";

const favoritesSchema = new Schema<Movie & Serial>(
  {
    user: { type: String, required: true, ref: "User" },
    id: { type: Number, require: true },
    adult: { type: Boolean },
    backdrop_path: { type: String, required: true },
    media_type: { type: String },
    genre_ids: { type: [Number], required: true },
    original_language: { type: String, required: true },
    overview: { type: String, required: true },
    popularity: { type: Number, required: true },
    poster_path: { type: String, required: true },
    vote_average: { type: Number, required: true },
    vote_count: { type: Number, required: true },
    original_title: { type: String },
    title: { type: String },
    release_date: { type: String },
    video: { type: Boolean },
    name: { type: String },
    origin_country: { type: [String] },
    original_name: { type: String },
    first_air_date: { type: String },
    isFavorite: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export const Favorites =
  models.Favorites || model("Favorites", favoritesSchema);
