import { API_KEY, BASE_URL } from "@/types/constants";
import { ApiRequestConfigForHomePage } from "@/types/interfaces";

export const requestsConfigForHomePage: ApiRequestConfigForHomePage = {
  fetchTrendingMovies: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedMovies: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchUpcomingMovies: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  fetchPopularMovies: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchLatestMovies: `${BASE_URL}/movie/latest?api_key=${API_KEY}&language=en-US`,
  fetchNowPlayingMovies: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US`,
};
