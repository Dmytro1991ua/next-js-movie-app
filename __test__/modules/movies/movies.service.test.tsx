import { waitFor } from "@testing-library/react";
import { toast } from "react-toastify";

import { mockMovie, mockSerialDetails } from "@/mocks/testMocks";
import { moviesPageService } from "@/modules/movies/movies.service";
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

describe("MoviesPageService", () => {
  describe("fetchMoviesByGenre", () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ...mockMovie,
          }),
      })
    );

    it("Should return movies by genre for Movies Page", async () => {
      const response = await moviesPageService.fetchMoviesByGenre();

      expect(response.actionMovies).toEqual(mockMovie);
      expect(response.comedyMovies).toEqual(mockMovie);
    });

    it("should failed to load movies by genre and call toast with error message", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(moviesPageService.fetchMoviesByGenre()).rejects.toEqual(
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
        await moviesPageService.fetchSeeMorePageDataForMoviesPage("Test");

      expect(response).toEqual(mockMovie);
    });

    it("Should fail to load data for See More Page", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(
          moviesPageService.fetchSeeMorePageDataForMoviesPage("Test")
        ).rejects.toEqual("Test Error Message");
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
  });

  describe("fetchMoviesByGenreDetailsData", () => {
    it("Should return details data for movies by genre", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              ...mockSerialDetails,
            }),
        })
      );

      const response = await moviesPageService.fetchMoviesByGenreDetailsData();

      expect(response.movieOrSerialDetails).toEqual(mockSerialDetails);
    });

    it("should failed to load movies by genre details by genre and call toast with error message", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(
          moviesPageService.fetchMoviesByGenreDetailsData()
        ).rejects.toEqual("Test Error Message");
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
  });
});
