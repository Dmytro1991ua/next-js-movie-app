import {
  MediaType,
  MovieOrSerialResult,
  RequestAction,
} from "@/types/interfaces";
import { fetchDataWithHandling, getResponseErrorMessage } from "@/utils/utils";

import { toastService } from "./toast.service";

class MediaSeeMorePageService {
  async fetchSeeMorePageData(
    url: string,
    mediaType?: MediaType,
    action?: RequestAction
  ): Promise<MovieOrSerialResult | null> {
    try {
      return await fetchDataWithHandling<MovieOrSerialResult | null>({
        url,
        mediaType,
        action,
      });
    } catch (error) {
      const errorMessage = getResponseErrorMessage();
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const mediaSeeMorePageService = new MediaSeeMorePageService();
