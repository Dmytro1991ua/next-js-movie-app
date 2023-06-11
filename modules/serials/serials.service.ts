import { Cast, MovieOrSerialDetail } from "@/model/common";
import { toastService } from "@/services/toast.service";
import { SliderTitle } from "@/types/enums";
import {
  MovieOrSerialDetailsData,
  MovieOrSerialResult,
  SerialsPageData,
} from "@/types/interfaces";
import {
  requestsConfigForSerialDetailsPage,
  requestsConfigForSerialsPage,
} from "@/utils/requests";
import {
  fetchDataWithHandling,
  getResponseErrorMessage,
  getResponseErrorMessageForDetailsPage,
} from "@/utils/utils";

class SerialsPageService {
  async fetchSerialsData(): Promise<SerialsPageData> {
    try {
      const [
        latestSerialsResponse,
        serialsAiringTodayResponse,
        serialsOnAirResponse,
        popularSerialsResponse,
        topRatedSerialsResponse,
      ] = await Promise.all([
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForSerialsPage.fetchLatestSerials,
          mediaType: "serials",
          action: "fetch",
          genre: SliderTitle.LatestMoviesOrSerials,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForSerialsPage.fetchPopularSerials,
          mediaType: "serials",
          action: "fetch",
          genre: SliderTitle.PopularMoviesOrSerials,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForSerialsPage.fetchSerialsAiringToday,
          mediaType: "serials",
          action: "fetch",
          genre: SliderTitle.SerialsAiringToday,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForSerialsPage.fetchSerialsOnAir,
          mediaType: "serials",
          action: "fetch",
          genre: SliderTitle.SerialsOnAir,
        }),
        fetchDataWithHandling<MovieOrSerialResult | null>({
          url: requestsConfigForSerialsPage.fetchTopRatedSerials,
          mediaType: "serials",
          action: "fetch",
          genre: SliderTitle.TopRatedMoviesOrSerials,
        }),
      ]);

      return {
        latestSerials: latestSerialsResponse,
        serialsAiringToday: serialsAiringTodayResponse,
        serialsOnAir: serialsOnAirResponse,
        popularSerials: popularSerialsResponse,
        topRatedSerials: topRatedSerialsResponse,
      };
    } catch (error) {
      const errorMessage = getResponseErrorMessage(true);
      toastService.error(errorMessage);

      throw error;
    }
  }

  async fetchSerialDetailsData(
    serialId?: string | string[]
  ): Promise<MovieOrSerialDetailsData> {
    try {
      const serialUrl =
        requestsConfigForSerialDetailsPage(
          serialId
        ).fetchDataForSerialDetailsPage;
      const castUrl =
        requestsConfigForSerialDetailsPage(serialId).fetchSerialActors;

      const [serialDetailResponse, serialCastResponse] = await Promise.all([
        fetchDataWithHandling<MovieOrSerialDetail | null>({
          url: serialUrl,
          mediaType: "serials",
          action: "fetch",
        }),
        fetchDataWithHandling<Cast | null>({
          url: castUrl,
          mediaType: "serials",
          action: "fetch",
        }),
      ]);

      return {
        movieOrSerialDetails: serialDetailResponse,
        movieOrSerialActors: serialCastResponse,
      };
    } catch (error) {
      const errorMessage = getResponseErrorMessageForDetailsPage(true);
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }

  //TODO Move this method to shared service and make it reusable for all pages
  async fetchSeeMorePageDataForSerialsPage(
    url: string
  ): Promise<MovieOrSerialResult | null> {
    try {
      return await fetchDataWithHandling<MovieOrSerialResult>({
        url,
        mediaType: "serials",
        action: "fetch",
      });
    } catch (error) {
      const errorMessage = getResponseErrorMessage(true);
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const serialsPageService = new SerialsPageService();
