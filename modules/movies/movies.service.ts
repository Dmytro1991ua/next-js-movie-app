import { toastService } from "@/services/toast.service";
import { MoviesPageData } from "@/types/interfaces";
import { requestsConfigForMoviesPage } from "@/utils/requests";
import { getResponseErrorMessage } from "@/utils/utils";

class MoviesPageService {
  async fetchMoviesByGenre(): Promise<MoviesPageData> {
    try {
      const [
        actionMoviesResponse,
        comedyMoviesResponse,
        horrorMoviesResponse,
        thrillerMoviesResponse,
        historyMoviesResponse,
        documentaryMoviesResponse,
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
        horrorMovies: horrorMoviesResponse,
        thrillerMovies: thrillerMoviesResponse,
        historyMovies: historyMoviesResponse,
        documentariesMovies: documentaryMoviesResponse,
        warMovies: warMoviesResponse,
        westernMovies: westernMoviesResponse,
      };
    } catch (error) {
      const errorMessage = getResponseErrorMessage();
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const moviesPageService = new MoviesPageService();
