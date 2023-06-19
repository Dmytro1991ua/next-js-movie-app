import { RequestMethod } from "@/types/enums";
import { GetUserAvatarResult } from "@/types/interfaces";
import { fetchDataWithHandling, getRequestOptions } from "@/utils/utils";

import { DefaultUserWithId } from "./../pages/api/auth/auth.d";

class AvatarService {
  async fetchUserAvatar(
    user?: DefaultUserWithId
  ): Promise<GetUserAvatarResult | null> {
    const fetchUserAvatarOptions = getRequestOptions({
      method: RequestMethod.PUT,
      body: JSON.stringify({
        payload: {
          user,
        },
      }),
    });

    try {
      return await fetchDataWithHandling<GetUserAvatarResult | null>({
        url: "/api/avatar",
        mediaType: "",
        action: "fetch",
        options: fetchUserAvatarOptions,
        message: "Failed to fetch user avatar",
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const avatarService = new AvatarService();
