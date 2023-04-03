export interface Genre {
  id: number;
  name: string;
}

export interface CommonMovieOrSerialTypes {
  backdrop_path: string;
  media_type?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Actor {
  name: string;
  id: number;
}
export interface Cast {
  cast: Actor[];
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
  id?: string;
}

export interface ProductionCountryOrCompany {
  id?: number;
  name: string;
}

export interface MovieOrSerialDetail {
  id: number;
  genres: Genre[];
  backdrop_path: string;
  episode_run_time?: number[];
  name?: string;
  title?: string;
  first_air_date: string;
  homepage: string;
  languages: string[];
  last_air_date: string;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  vote_average: number;
  overview: string;
  poster_path: string;
  status: string;
  vote_count: number;
  tagline: string;
  release_date?: string;
  revenue: number;
  runtime?: number;
  spoken_languages?: SpokenLanguage[];
  production_countries?: ProductionCountryOrCompany[];
  production_companies?: ProductionCountryOrCompany[];
}
