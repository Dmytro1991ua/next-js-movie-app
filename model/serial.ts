import { CommonMovieOrSerialTypes } from "./common";

export interface Serial extends CommonMovieOrSerialTypes {
  name: string;
  origin_country: string[];
  original_name: string;
  first_air_date: string;
}
