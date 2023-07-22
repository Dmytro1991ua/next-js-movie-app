import { Cast, MovieOrSerialDetail } from "@/model/common";
import {
  ContentType,
  MediaType,
  MovieOrSerialDetailsData,
  RequestAction,
} from "@/types/interfaces";
import { requestsConfigForMediaDetailsPage } from "@/utils/requests";

import { toastService } from "./toast.service";
import {
  fetchDataWithHandling,
  getResponseErrorMessageForDetailsPage,
} from "../utils/utils";

class MediaDetailsService {
  async fetchMediaDetailsData({
    id,
    mediaType,
    action,
    contentType,
  }: {
    id?: string | string[];
    mediaType?: MediaType;
    action?: RequestAction;
    contentType?: ContentType;
  }): Promise<MovieOrSerialDetailsData> {
    try {
      const movieUrl = requestsConfigForMediaDetailsPage(
        id,
        contentType
      ).fetchDataForMediaDetailsPage;
      const castUrl = requestsConfigForMediaDetailsPage(
        id,
        contentType
      ).fetchActorsForMediaDetailsPage;

      const [movieDetailResponse, movieCastResponse] = await Promise.all([
        fetchDataWithHandling<MovieOrSerialDetail | null>({
          url: movieUrl,
          mediaType,
          action,
        }),
        fetchDataWithHandling<Cast | null>({
          url: castUrl,
          mediaType,
          action,
        }),
      ]);

      return {
        movieOrSerialDetails: movieDetailResponse,
        movieOrSerialActors: movieCastResponse,
      };
    } catch (error) {
      const errorMessage = getResponseErrorMessageForDetailsPage();
      toastService.error(errorMessage);

      throw new Error((error as Error).message);
    }
  }
}

export const mediaDetailsService = new MediaDetailsService();
