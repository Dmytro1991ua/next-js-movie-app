import { toastService } from "@/services/toast.service";
import { HomePageData } from "@/types/interfaces";
import { requestsConfigForHomePage } from "@/utils/requests";
import { getResponseErrorMessage } from "@/utils/utils";

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
}

export const homePageService = new HomePageService();
