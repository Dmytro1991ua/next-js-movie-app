import { CommonMovieOrSerialTypes } from "./common";

export interface Movie extends CommonMovieOrSerialTypes {
  adult: boolean;
  original_title: string;
  title: string;
  release_date: string;
  video: boolean;
}
