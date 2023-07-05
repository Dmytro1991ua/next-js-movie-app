import { profileService } from "@/modules/profile/profile.service";
import { SUCCESSFULLY_UPDATE_USER_PROFILE_DATA } from "@/types/constants";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("@/utils/utils", () => {
  const originalUtils = jest.requireActual("@/utils/utils");

  return {
    ...originalUtils,
    getRequestOptions: () => ({
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: "test_body",
    }),
  };
});

describe("ProfileService", () => {
  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (window.fetch as jest.Mock).mockReset();
  });

  describe("uploadProfileData", () => {
    const mockPayload = {
      user: {
        id: "mockUserId",
        name: "John Doe",
        email: "johndoe@example.com",
        image: "https://example.com/avatar.jpg",
      },
      userInfo: {
        name: "Alex Smith",
        password: "12345678",
      },
    };

    const mockData = {
      success: true,
      message: SUCCESSFULLY_UPDATE_USER_PROFILE_DATA,
    };

    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should successfully update profile data", async () => {
      const mockResponse = mockData;

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const response = await profileService.uploadProfileData(mockPayload);

      expect(response).toEqual(mockResponse);
    });

    it("Should failed to update profile data", async () => {
      const errorMessage = "Failed to update profile data";

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        profileService.uploadProfileData(mockPayload)
      ).rejects.toThrowError(errorMessage);
    });
  });
});
