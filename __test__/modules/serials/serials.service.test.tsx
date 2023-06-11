import { mockMovie } from "@/mocks/testMocks";
import { serialsPageService } from "@/modules/serials/serials.service";
import { getResponseErrorMessage } from "@/utils/utils";
getResponseErrorMessage;

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
    getResponseErrorMessageForDetailsPage: jest
      .fn()
      .mockReturnValue("Failed to fetch movie details"),
    getResponseErrorMessage: () => "Test Error Message",
    getRequestOptions: () => ({
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: "test_body",
    }),
  };
});

describe("SerialsPageService", () => {
  describe("fetchSerialsData", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return serials for Serials Page", async () => {
      jest
        .spyOn(window, "fetch")
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(mockMovie),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(mockMovie),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(mockMovie),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(mockMovie),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(mockMovie),
        } as unknown as Response);

      const response = await serialsPageService.fetchSerialsData();

      expect(response.latestSerials).toEqual(mockMovie);
      expect(response.topRatedSerials).toEqual(mockMovie);
    });

    it("should failed to load serials and call toast with error message", async () => {
      const errorMessage = "Failed to fetch serials";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(serialsPageService.fetchSerialsData()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("fetchSeeMorePageDataForSerialsPage", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return data for See More pages", async () => {
      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockMovie),
      });

      const response =
        await serialsPageService.fetchSeeMorePageDataForSerialsPage("Test");

      expect(response).toEqual(mockMovie);
    });

    it("Should fail to load data for See More Page", async () => {
      const errorMessage = "Failed to fetch serials for See More page";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(
        serialsPageService.fetchSeeMorePageDataForSerialsPage("Test")
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("fetchSerialDetailsData", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return serials details by its ID", async () => {
      const movieDetailResponse = { id: "movie123", title: "Movie Title" };
      const movieCastResponse = { cast: [{ id: "actor1", name: "Actor 1" }] };

      (window.fetch as jest.Mock)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(movieDetailResponse),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(movieCastResponse),
        });

      const result = await serialsPageService.fetchSerialDetailsData(
        "movie123"
      );

      expect(result.movieOrSerialDetails).toEqual(movieDetailResponse);
      expect(result.movieOrSerialActors).toEqual(movieCastResponse);
    });

    it("should failed to load movies by genre and call toast with error message", async () => {
      const errorMessage = "Failed to fetch serial details";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(
        serialsPageService.fetchSerialDetailsData("movie123")
      ).rejects.toThrowError(errorMessage);
    });
  });
});
