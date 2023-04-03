import { waitFor } from "@testing-library/react";
import { toast } from "react-toastify";

import { mockMovie, mockSerialDetails } from "@/mocks/testMocks";
import { homePageService } from "@/modules/home/home.service";
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

describe("HomePageService", () => {
  describe("fetchMoviesForHomePage", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ...mockMovie,
          }),
      })
    );

    it("Should return movies for Home Page", async () => {
      const response = await homePageService.fetchMoviesForHomePage();

      expect(response.latestMovies).toEqual(mockMovie);
      expect(response.nowPlayingMovies).toEqual(mockMovie);
    });

    it("Should failed to load movies and call toast with error message", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(homePageService.fetchMoviesForHomePage()).rejects.toEqual(
          "Test Error Message"
        );
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
  });

  describe("fetchMoviesDetailsData", () => {
    it("Should return movie details data by its id", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              ...mockSerialDetails,
            }),
        })
      );

      const response = await homePageService.fetchMoviesDetailsData("66633");

      expect(response.movieOrSerialDetails).toEqual(mockSerialDetails);
    });

    it("Should failed to load movies details and call toast with error message", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(homePageService.fetchMoviesDetailsData()).rejects.toEqual(
          "Test Error Message"
        );
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
  });
});
