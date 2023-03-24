import { toastService } from "@/services/toast.service";
import { SerialsPageData } from "@/types/interfaces";
import { requestsConfigForSerialsPage } from "@/utils/requests";
import { getResponseErrorMessage } from "@/utils/utils";

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
}

export const serialsPageService = new SerialsPageService();
