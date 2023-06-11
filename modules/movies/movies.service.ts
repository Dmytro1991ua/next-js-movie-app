import { Cast, MovieOrSerialDetail } from "@/model/common";
import { toastService } from "@/services/toast.service";
import { SliderTitle } from "@/types/enums";
import {
  DataFetcherProps,
  MovieOrSerialDetailsData,
  MovieOrSerialResult,
  MoviesPageData,
} from "@/types/interfaces";
import {
  requestConfigForSearchPage,
  requestsConfigForMovieDetailsPage,
  requestsConfigForMoviesPage,
} from "@/utils/requests";
import {
  fetchDataWithHandling,
  getResponseErrorMessage,
  getResponseErrorMessageForDetailsPage,
} from "@/utils/utils";

class MoviesPageService {
  async fetchMoviesByGenre(): Promise<MoviesPageData> {
    try {
      const [
        actionMoviesResponse,
        comedyMoviesResponse,
        documentaryMoviesResponse,
        historyMoviesResponse,
        horrorMoviesResponse,
        thrillerMoviesResponse,
        warMoviesResponse,
        westernMoviesResponse,
      ] = await Promise.all([
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForMoviesPage.fetchActionMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.ActionMovies,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForMoviesPage.fetchComedyMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.ComedyMovies,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForMoviesPage.fetchDocumentariesMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.Documentaries,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForMoviesPage.fetchHistoryMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.HistoryMovies,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForMoviesPage.fetchHorrorMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.HistoryMovies,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForMoviesPage.fetchThrillerMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.ThrillerMovies,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForMoviesPage.fetchWarMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.WarMovies,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForMoviesPage.fetchWesternMovies,
          mediaType: "movies",
          action: "fetch",
          genre: SliderTitle.WesternMovies,
        }),
      ]);

      return {
        actionMovies: actionMoviesResponse,
        comedyMovies: comedyMoviesResponse,
        documentariesMovies: documentaryMoviesResponse,
        historyMovies: historyMoviesResponse,
        horrorMovies: horrorMoviesResponse,
        thrillerMovies: thrillerMoviesResponse,
        warMovies: warMoviesResponse,
        westernMovies: westernMoviesResponse,
      };
    } catch (error) {
      const errorMessage = getResponseErrorMessage();
      toastService.error(errorMessage);

      throw error;
    }
  }

  async fetchMoviesByGenreDetailsData(
    movieByGenreId?: string | string[]
  ): Promise<MovieOrSerialDetailsData> {
    try {
      const movieByGenreUrl =
        requestsConfigForMovieDetailsPage(
          movieByGenreId
        ).fetchDataForHomeAndMovieDetailsPage;
      const castUrl =
        requestsConfigForMovieDetailsPage(movieByGenreId).fetchMovieActors;

      const [movieByGenreDetailResponse, movieCastResponse] = await Promise.all(
        [
          fetchDataWithHandling<MovieOrSerialDetail | null>({
            url: movieByGenreUrl,
            mediaType: "movies",
            action: "fetch",
          }),
          fetchDataWithHandling<Cast | null>({
            url: castUrl,
            mediaType: "movies",
            action: "fetch",
          }),
        ]
      );

      return {
        movieOrSerialDetails: movieByGenreDetailResponse,
        movieOrSerialActors: movieCastResponse,
      };
    } catch (error) {
      const errorMessage = getResponseErrorMessageForDetailsPage();
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }

  //TODO Move this method to shared service and make it reusable for all pages
  async fetchSeeMorePageDataForMoviesPage(
    url: string
  ): Promise<MovieOrSerialResult | null> {
    try {
      return await fetchDataWithHandling<MovieOrSerialResult | null>({
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

  //TODO Move this method to shared service
  async fetchDataForSearchPage({
    searchPath,
    searchParam,
    pageParam = 1,
  }: DataFetcherProps): Promise<MovieOrSerialResult | null> {
    try {
      const url = requestConfigForSearchPage({
        searchPath,
        searchParam,
        pageParam,
      }).fetchDataForSearchPage;

      return await fetchDataWithHandling<MovieOrSerialResult | null>({
        url,
        mediaType: "movies",
        action: "fetch",
        message: "Failed to fetch data based on search parameter",
      });
    } catch (error) {
      const errorMessage = getResponseErrorMessage();
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const moviesPageService = new MoviesPageService();
