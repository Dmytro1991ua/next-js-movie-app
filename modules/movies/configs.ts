import { API_KEY, BASE_URL } from "@/types/constants";
import { ApiRequestConfigForMoviesPage } from "@/types/interfaces";

export const requestsConfigForMoviesPage: ApiRequestConfigForMoviesPage = {
  fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  fetchThrillerMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=53`,
  fetchHistoryMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=36`,
  fetchDocumentariesMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  fetchWarMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10752`,
  fetchWesternMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=37`,
};
