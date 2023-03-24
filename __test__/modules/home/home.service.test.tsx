import { waitFor } from "@testing-library/react";
import { toast } from "react-toastify";

import { mockMovie } from "@/mocks/testMocks";
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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        ...mockMovie,
      }),
  })
);

describe("HomePageService", () => {
  it("Should return movies for Home Page", async () => {
    const response = await homePageService.fetchMoviesForHomePage();

    expect(response.latestMovies).toEqual(mockMovie);
    expect(response.nowPlayingMovies).toEqual(mockMovie);
  });

  it("should failed to load movies and call toast with error message", async () => {
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
