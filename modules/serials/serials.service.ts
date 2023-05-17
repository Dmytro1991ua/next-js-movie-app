import { toastService } from "@/services/toast.service";
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
        fetch(requestsConfigForSerialsPage.fetchLatestSerials).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForSerialsPage.fetchPopularSerials).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForSerialsPage.fetchSerialsAiringToday).then(
          (res) => res.json()
        ),
        fetch(requestsConfigForSerialsPage.fetchSerialsOnAir).then((res) =>
          res.json()
        ),
        fetch(requestsConfigForSerialsPage.fetchTopRatedSerials).then((res) =>
          res.json()
        ),
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

      throw new Error((error as Error).message);
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
        fetch(serialUrl).then((res) => res.json()),
        fetch(castUrl).then((res) => res.json()),
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
      const response = await fetch(url);

      return await response.json();
    } catch (error) {
      const errorMessage = getResponseErrorMessage(true);
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const serialsPageService = new SerialsPageService();
