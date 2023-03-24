import { waitFor } from "@testing-library/react";
import { toast } from "react-toastify";

import { mockMovie } from "@/mocks/testMocks";
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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        ...mockMovie,
      }),
  })
);

describe("MoviesPageService", () => {
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
});
