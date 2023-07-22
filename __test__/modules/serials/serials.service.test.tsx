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
});
