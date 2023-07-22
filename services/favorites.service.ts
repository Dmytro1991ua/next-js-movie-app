import { DefaultUserWithId } from "@/pages/api/auth/auth";
import { RequestMethod } from "@/types/enums";
import {
  AddToFavoritePayload,
  FavoritesMoviesOrSerialsResult,
  MediaType,
  RemoveFromFavoritePayload,
  RequestAction,
} from "@/types/interfaces";
import { fetchDataWithHandling, getRequestOptions } from "@/utils/utils";

class FavoritesService {
  async fetchFavoritesMoviesOrSerials(
    user?: DefaultUserWithId,
    mediaType?: MediaType,
    action?: RequestAction
  ): Promise<FavoritesMoviesOrSerialsResult | null> {
    try {
      const favoritesDataPayload = getRequestOptions({
        method: RequestMethod.POST,
        body: JSON.stringify({
          payload: {
            user,
          },
        }),
      });

      return await fetchDataWithHandling<FavoritesMoviesOrSerialsResult | null>(
        {
          url: "/api/favorites",
          mediaType,
          action,
          options: favoritesDataPayload,
          message: "Failed to load favorites movies or serials",
        }
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateFavoriteMovieOrSerial(
    payload:
      | AddToFavoritePayload["payload"]
      | RemoveFromFavoritePayload["payload"],
    method: RequestMethod,
    mediaType?: MediaType,
    action?: RequestAction
  ): Promise<FavoritesMoviesOrSerialsResult | null> {
    try {
      const favoritesDataPayload = getRequestOptions({
        method,
        body: JSON.stringify({
          payload,
        }),
      });

      return await fetchDataWithHandling<FavoritesMoviesOrSerialsResult | null>(
        {
          url: "/api/favorites",
          mediaType,
          action,
          options: favoritesDataPayload,
          message: "Failed to add to or remove from favorites list",
        }
      );
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const favoritesService = new FavoritesService();
