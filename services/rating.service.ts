import { Rating } from "@/model/rating";
import { DefaultUserWithId } from "@/pages/api/auth/auth";
import { RequestMethod } from "@/types/enums";
import { UpdateRatingResult } from "@/types/interfaces";
import { fetchDataWithHandling, getRequestOptions } from "@/utils/utils";

class RatingService {
  async fetchRatingById(
    user?: DefaultUserWithId
  ): Promise<UpdateRatingResult | null> {
    try {
      const ratingDataPayload = getRequestOptions({
        method: RequestMethod.PUT,
        body: JSON.stringify({
          payload: {
            user,
          },
        }),
      });

      return await fetchDataWithHandling<UpdateRatingResult | null>({
        url: "/api/rating",
        mediaType: "movies",
        action: "fetch",
        options: ratingDataPayload,
        message: "Failed to load rating data",
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateMovieOrSerialRating(data: Rating, user?: DefaultUserWithId) {
    try {
      const updateRatingPayload = getRequestOptions({
        method: RequestMethod.POST,
        body: JSON.stringify({
          payload: {
            data,
            user,
          },
        }),
      });

      return await fetchDataWithHandling<UpdateRatingResult | null>({
        url: "/api/rating",
        mediaType: "movies",
        action: "update",
        options: updateRatingPayload,
        message: "Failed to update rating",
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const ratingService = new RatingService();
