import { RequestMethod } from "@/types/enums";
import {
  UpdateProfileData,
  UpdateUserProfilePayload,
} from "@/types/interfaces";
import { fetchDataWithHandling, getRequestOptions } from "@/utils/utils";

class ProfileService {
  async uploadProfileData(payload: UpdateUserProfilePayload["payload"]) {
    const updateProfileData = getRequestOptions({
      method: RequestMethod.PATCH,
      body: JSON.stringify({
        payload,
      }),
    });

    try {
      return await fetchDataWithHandling<UpdateProfileData | null>({
        url: "/api/profile",
        mediaType: "",
        action: "update",
        options: updateProfileData,
        message: "Failed to update profile data",
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export const profileService = new ProfileService();
