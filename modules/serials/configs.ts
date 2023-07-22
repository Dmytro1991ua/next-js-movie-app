import { API_KEY, BASE_URL } from "@/types/constants";
import { ApiRequestConfigForSerialsPage } from "@/types/interfaces";

export const requestsConfigForSerialsPage: ApiRequestConfigForSerialsPage = {
  fetchLatestSerials: `${BASE_URL}/tv/latest?api_key=${API_KEY}&language=en-US`,
  fetchSerialsAiringToday: `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US`,
  fetchSerialsOnAir: `${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&language=en-US`,
  fetchPopularSerials: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedSerials: `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US`,
};
