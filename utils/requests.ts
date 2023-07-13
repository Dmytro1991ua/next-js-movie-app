import { API_KEY, BASE_URL } from "@/types/constants";
import {
  ApiRequestConfigForHomePage,
  ApiRequestConfigForMoviesPage,
  ApiRequestConfigForSerialsPage,
  DataFetcherProps,
} from "@/types/interfaces";

export const requestsConfigForMovieDetailsPage = (
  movieId?: string | string[]
): {
  fetchDataForHomeAndMovieDetailsPage: string;
  fetchMovieActors: string;
} => ({
  fetchDataForHomeAndMovieDetailsPage: `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`,
  fetchMovieActors: `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
});

export const requestsConfigForSeeMorePage = (
  pageParam = 1
): ApiRequestConfigForHomePage &
  ApiRequestConfigForMoviesPage &
  ApiRequestConfigForSerialsPage => {
  return {
    fetchTrendingMovies: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchTopRatedMovies: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchUpcomingMovies: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchLatestMovies: `${BASE_URL}/movie/latest?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchNowPlayingMovies: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28&page=${pageParam}`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35&page=${pageParam}`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27&page=${pageParam}`,
    fetchThrillerMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=53&page=${pageParam}`,
    fetchHistoryMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=36&page=${pageParam}`,
    fetchDocumentariesMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99&page=${pageParam}`,
    fetchWarMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10752&page=${pageParam}`,
    fetchWesternMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=37&page=${pageParam}`,
    fetchLatestSerials: `${BASE_URL}/tv/latest?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchSerialsAiringToday: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchSerialsOnAir: `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchPopularSerials: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
    fetchTopRatedSerials: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${pageParam}`,
  };
};

export const requestConfigForSearchPage = ({
  searchPath,
  searchParam,
  pageParam = 1,
}: DataFetcherProps): { fetchDataForSearchPage: string } => {
  return {
    fetchDataForSearchPage: `${BASE_URL}${searchPath}?api_key=${API_KEY}&query=${searchParam}&language=en-US&page=${pageParam}&include_adult=false`,
  };
};
