import { toastService } from "@/services/toast.service";
import { SliderTitle } from "@/types/enums";
import { MovieOrSerialResult, MoviesPageData } from "@/types/interfaces";
import { fetchDataWithHandling, getResponseErrorMessage } from "@/utils/utils";

import { requestsConfigForMoviesPage } from "./configs";

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
}

export const moviesPageService = new MoviesPageService();
