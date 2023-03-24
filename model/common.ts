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
