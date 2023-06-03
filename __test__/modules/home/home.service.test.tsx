import { waitFor } from "@testing-library/react";
import { toast } from "react-toastify";

import { mockMovie, mockSerialDetails } from "@/mocks/testMocks";
import { homePageService } from "@/modules/home/home.service";
import { RequestMethod } from "@/types/enums";
import { getResponseErrorMessage } from "@/utils/utils";
getResponseErrorMessage;

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("@/utils/utils", () => ({
  getResponseErrorMessage: () => "Test Error Message",
  getRequestOptions: () => ({
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: "test_body",
  }),
}));

const mockSession = {
  user: {
    id: "mockUserId",
    name: "John Doe",
    email: "johndoe@example.com",
    image: "https://example.com/avatar.jpg",
  },
  expires: "test_expiration",
};

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

    it("Should fail to load movies and call toast with error message", async () => {
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

    it("Should return data for See More pages", async () => {
      const response = await homePageService.fetchSeeMorePageDataForHomePage(
        "Test"
      );

      expect(response).toEqual(mockMovie);
    });

    it("Should fail to load data for See More Page", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(
          homePageService.fetchSeeMorePageDataForHomePage("Test")
        ).rejects.toEqual("Test Error Message");
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

  describe("fetchFavoritesMoviesOrSerials", () => {
    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return return favorites movies or serials for a specific user", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              data: {
                ...mockSerialDetails,
              },
            }),
        })
      );

      const response = await homePageService.fetchFavoritesMoviesOrSerials(
        mockSession.user
      );

      expect(response?.data).toEqual(mockSerialDetails);
    });

    it("Should failed to load favorites movies or serials and call toast with error message", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(
          homePageService.fetchFavoritesMoviesOrSerials(mockSession.user)
        ).rejects.toEqual("Test Error Message");
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
  });

  describe("updateFavoriteMovieOrSerial", () => {
    const mockPayload = {
      user: {
        id: "mockUserId",
        name: "John Doe",
        email: "johndoe@example.com",
        image: "https://example.com/avatar.jpg",
      },
      favorites: mockSerialDetails,
    };

    const mockMethod = RequestMethod.POST;

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return return favorites movies or serials for a specific user", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              data: {
                ...mockSerialDetails,
              },
            }),
        })
      );

      const response = await homePageService.updateFavoriteMovieOrSerial(
        mockPayload,
        mockMethod
      );

      expect(response?.data).toEqual(mockSerialDetails);
    });

    it("Should failed to load favorites movies or serials and call toast with error message", async () => {
      try {
        (window.fetch as jest.Mock).mockResolvedValueOnce({
          ok: false,
        });
        await expect(
          homePageService.updateFavoriteMovieOrSerial(mockPayload, mockMethod)
        ).rejects.toEqual("Test Error Message");
      } catch {
        await waitFor(() =>
          expect(toast.error).toHaveBeenCalledWith("Test Error Message")
        );
      }
    });
  });
});
