import { Cast, MovieOrSerialDetail } from "@/model/common";
import { Movie } from "@/model/movie";
import { Rating } from "@/model/rating";
import { DefaultUserWithId } from "@/pages/api/auth/auth";
import { toastService } from "@/services/toast.service";
import { RequestMethod, SliderTitle } from "@/types/enums";
import {
  AddToFavoritePayload,
  FavoritesMoviesOrSerialsResult,
  HomePageData,
  MovieOrSerialDetailsData,
  MovieOrSerialResult,
  RemoveFromFavoritePayload,
  UpdateRatingResult,
} from "@/types/interfaces";
import { requestsConfigForMovieDetailsPage } from "@/utils/requests";
import {
  fetchDataWithHandling,
  getResponseErrorMessage,
  getResponseErrorMessageForDetailsPage,
} from "@/utils/utils";

import { getRequestOptions } from "./../../utils/utils";
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

  //TODO Move this method to shared service and make it reusable for all pages
  async fetchSeeMorePageDataForHomePage(
    url: string
  ): Promise<MovieOrSerialResult | null> {
    try {
      return await fetchDataWithHandling<MovieOrSerialResult>({
        url,
        mediaType: "movies",
        action: "fetch",
      });
    } catch (error) {
      const errorMessage = getResponseErrorMessage();
      toastService.error(errorMessage);

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
        fetchDataWithHandling<MovieOrSerialDetail>({
          url: movieUrl,
          mediaType: "movies",
          action: "fetch",
        }),
        fetchDataWithHandling<Cast>({
          url: castUrl,
          mediaType: "movies",
          action: "fetch",
        }),
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

  //TODO Move this method to shared service
  async fetchFavoritesMoviesOrSerials(
    user?: DefaultUserWithId
  ): Promise<FavoritesMoviesOrSerialsResult | null> {
    try {
      const favoritesDataPayload = getRequestOptions({
        method: RequestMethod.POST,
        body: JSON.stringify({
          payload: {
            user,
          },
        }),
      });

      return await fetchDataWithHandling<FavoritesMoviesOrSerialsResult | null>(
        {
          url: "/api/favorites",
          mediaType: "movies",
          action: "fetch",
          options: favoritesDataPayload,
          message: "Failed to load favorites movies or serials",
        }
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  //TODO Move method to shared service
  async updateFavoriteMovieOrSerial(
    payload:
      | AddToFavoritePayload["payload"]
      | RemoveFromFavoritePayload["payload"],
    method: RequestMethod
  ): Promise<FavoritesMoviesOrSerialsResult | null> {
    try {
      const favoritesDataPayload = getRequestOptions({
        method,
        body: JSON.stringify({
          payload,
        }),
      });

      return await fetchDataWithHandling<FavoritesMoviesOrSerialsResult | null>(
        {
          url: "/api/favorites",
          mediaType: "movies",
          action: "fetch",
          options: favoritesDataPayload,
          message: "Failed to add to or remove from favorites list",
        }
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  //TODO Move method to shared service
  async fetchRatingById(
    user?: DefaultUserWithId
  ): Promise<UpdateRatingResult | null> {
    try {
      const ratingDataPayload = getRequestOptions({
        method: RequestMethod.PUT,
        body: JSON.stringify({
          payload: {
            user,
          },
        }),
      });

      return await fetchDataWithHandling<UpdateRatingResult | null>({
        url: "/api/rating",
        mediaType: "movies",
        action: "fetch",
        options: ratingDataPayload,
        message: "Failed to load rating data",
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  //TODO Move method to shared service
  async updateMovieOrSerialRating(data: Rating, user?: DefaultUserWithId) {
    try {
      const updateRatingPayload = getRequestOptions({
        method: RequestMethod.POST,
        body: JSON.stringify({
          payload: {
            data,
            user,
          },
        }),
      });

      return await fetchDataWithHandling<UpdateRatingResult | null>({
        url: "/api/rating",
        mediaType: "movies",
        action: "update",
        options: updateRatingPayload,
        message: "Failed to update rating",
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const homePageService = new HomePageService();
