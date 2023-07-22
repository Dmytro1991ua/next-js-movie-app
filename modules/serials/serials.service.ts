import { toastService } from "@/services/toast.service";
import { SliderTitle } from "@/types/enums";
import { MovieOrSerialResult, SerialsPageData } from "@/types/interfaces";
import { fetchDataWithHandling, getResponseErrorMessage } from "@/utils/utils";

import { requestsConfigForSerialsPage } from "./configs";

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
}

export const serialsPageService = new SerialsPageService();
