import { Movie } from "@/model/movie";
import { toastService } from "@/services/toast.service";
import { SliderTitle } from "@/types/enums";
import { HomePageData, MovieOrSerialResult } from "@/types/interfaces";
import { fetchDataWithHandling, getResponseErrorMessage } from "@/utils/utils";

import { requestsConfigForHomePage } from "./configs";

class HomePageService {
  async fetchMoviesForHomePage(): Promise<HomePageData> {
    try {
      const [
        latestMoviesResponse,
        nowPlayingMoviesResponse,
        popularMoviesResponse,
        topRatedMoviesResponse,
        trendingMoviesResponse,
        upcomingMoviesResponse,
      ] = await Promise.all([
        fetchDataWithHandling<Movie>({
          url: requestsConfigForHomePage.fetchLatestMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.LatestMoviesOrSerials,
        }),
        fetchDataWithHandling<MovieOrSerialResult>({
          url: requestsConfigForHomePage.fetchNowPlayingMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.NowPlayingMovies,
        }),
        fetchDataWithHandling<MovieOrSerialResult>({
          url: requestsConfigForHomePage.fetchPopularMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.PopularMoviesOrSerials,
        }),
        fetchDataWithHandling<MovieOrSerialResult>({
          url: requestsConfigForHomePage.fetchTopRatedMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.TopRatedMoviesOrSerials,
        }),
        fetchDataWithHandling<MovieOrSerialResult>({
          url: requestsConfigForHomePage.fetchTrendingMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.TrendingMovies,
        }),
        fetchDataWithHandling<MovieOrSerialResult>({
          url: requestsConfigForHomePage.fetchUpcomingMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.UpcomingMovies,
        }),
      ]);

      return {
        latestMovies: latestMoviesResponse,
        nowPlayingMovies: nowPlayingMoviesResponse,
        popularMovies: popularMoviesResponse,
        topRatedMovies: topRatedMoviesResponse,
        trendingMovies: trendingMoviesResponse,
        upcomingMovies: upcomingMoviesResponse,
      };
    } catch (error) {
      const errorMessage = getResponseErrorMessage();
      toastService.error(errorMessage);

      throw error;
    }
  }
}

export const homePageService = new HomePageService();
