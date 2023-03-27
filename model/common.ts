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
}
export interface Cast {
  cast: Actor[];
}

export interface SpokenLanguages {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieOrSerialDetail {
  id: number;
  genre: Genre[];
  backdrop_path: string;
  episode_run_time: number[];
  name: string;
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
  spoken_languages: SpokenLanguages[];
}
