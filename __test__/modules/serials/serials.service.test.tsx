import { waitFor } from "@testing-library/react";
import { toast } from "react-toastify";

import { mockMovie, mockSerialDetails } from "@/mocks/testMocks";
import { serialsPageService } from "@/modules/serials/serials.service";
import { getResponseErrorMessage } from "@/utils/utils";
getResponseErrorMessage;

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("@/utils/utils", () => ({
  getResponseErrorMessage: () => "Test Error Message",
}));

describe("SerialsPageService", () => {
  describe("fetchSerialsData", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ...mockMovie,
          }),
      })
    );

    it("Should return serials Serials Page", async () => {
      const response = await serialsPageService.fetchSerialsData();

      expect(response.latestSerials).toEqual(mockMovie);
      expect(response.topRatedSerials).toEqual(mockMovie);
    });

    it("should failed to load movies by genre and call toast with error message", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(serialsPageService.fetchSerialsData()).rejects.toEqual(
          "Test Error Message"
        );
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
    it("Should return data for See More pages", async () => {
      const response =
        await serialsPageService.fetchSeeMorePageDataForSerialsPage("Test");

      expect(response).toEqual(mockMovie);
    });

    it("Should fail to load data for See More Page", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(
          serialsPageService.fetchSeeMorePageDataForSerialsPage("Test")
        ).rejects.toEqual("Test Error Message");
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
  });

  describe("fetchSerialDetailsData", () => {
    it("Should return serials details by its ID", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              ...mockSerialDetails,
            }),
        })
      );

      const response = await serialsPageService.fetchSerialDetailsData();

      expect(response.movieOrSerialDetails).toEqual(mockSerialDetails);
    });

    it("should failed to load movies by genre and call toast with error message", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(
          serialsPageService.fetchSerialDetailsData()
        ).rejects.toEqual("Test Error Message");
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
  });
});
