import { toastService } from "@/services/toast.service";
import {
  MovieOrSerialDetailsData,
  MovieOrSerialResult,
  MoviesPageData,
} from "@/types/interfaces";
import {
  requestsConfigForMovieDetailsPage,
  requestsConfigForMoviesPage,
} from "@/utils/requests";
import {
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
        fetch(requestsConfigForMoviesPage.fetchActionMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForMoviesPage.fetchComedyMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForMoviesPage.fetchDocumentariesMovies).then(
          (res) => res.json()
        ),
        fetch(requestsConfigForMoviesPage.fetchHistoryMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForMoviesPage.fetchHorrorMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForMoviesPage.fetchThrillerMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForMoviesPage.fetchWarMovies).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForMoviesPage.fetchWesternMovies).then((res) =>
          res.json()
        ),
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

      throw new Error((error as Error).message);
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
          fetch(movieByGenreUrl).then((res) => res.json()),
          fetch(castUrl).then((res) => res.json()),
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

  async fetchSeeMorePageDataForMoviesPage(
    url: string
  ): Promise<MovieOrSerialResult | null> {
    try {
      const response = await fetch(url);

      return await response.json();
    } catch (error) {
      const errorMessage = getResponseErrorMessage();
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const moviesPageService = new MoviesPageService();
