import { toastService } from "@/services/toast.service";
import {
  HomePageData,
  MovieOrSerialDetailsData,
  MovieOrSerialResult,
} from "@/types/interfaces";
import {
  requestsConfigForHomePage,
  requestsConfigForMovieDetailsPage,
} from "@/utils/requests";
import {
  getResponseErrorMessage,
  getResponseErrorMessageForDetailsPage,
} from "@/utils/utils";

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
        fetch(requestsConfigForHomePage.fetchLatestMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForHomePage.fetchNowPlayingMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForHomePage.fetchPopularMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForHomePage.fetchTopRatedMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForHomePage.fetchTrendingMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForHomePage.fetchUpcomingMovies).then((res) =>
          res.json()
        ),
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

      throw new Error((error as Error).message);
    }
  }

  async fetchSeeMorePageDataForHomePage(
    url: string
  ): Promise<MovieOrSerialResult | null> {
    try {
      const response = await fetch(url);

      if (!response) {
        return null;
      }

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async fetchMoviesDetailsData(
    movieId?: string | string[]
  ): Promise<MovieOrSerialDetailsData> {
    try {
      const movieUrl =
        requestsConfigForMovieDetailsPage(
          movieId
        ).fetchDataForHomeAndMovieDetailsPage;
      const castUrl =
        requestsConfigForMovieDetailsPage(movieId).fetchMovieActors;

      const [movieDetailResponse, movieCastResponse] = await Promise.all([
        fetch(movieUrl).then((res) => res.json()),
        fetch(castUrl).then((res) => res.json()),
      ]);

      return {
        movieOrSerialDetails: movieDetailResponse,
        movieOrSerialActors: movieCastResponse,
      };
    } catch (error) {
      const errorMessage = getResponseErrorMessageForDetailsPage();
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const homePageService = new HomePageService();
