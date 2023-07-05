import { mockMovie, mockSerialDetails } from "@/mocks/testMocks";
import { homePageService } from "@/modules/home/home.service";
import { RequestMethod } from "@/types/enums";

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
  beforeEach(() => {
    (window.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    (window.fetch as jest.Mock).mockReset();
  });

  describe("fetchMoviesForHomePage", () => {
    it("Should return movies for Home Page", async () => {
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
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(mockMovie),
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(mockMovie),
        } as unknown as Response);
      const response = await homePageService.fetchMoviesForHomePage();

      expect(response.latestMovies).toEqual(mockMovie);
      expect(response.nowPlayingMovies).toEqual(mockMovie);
      expect(response.trendingMovies).toEqual(mockMovie);
    });

    it("Should fail to load movies and call toast with error message", async () => {
      const errorMessage = "Failed to fetch movie details";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(
        homePageService.fetchMoviesForHomePage()
      ).rejects.toThrowError(errorMessage);
    });

    it("Should return data for See More pages", async () => {
      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockMovie),
      });

      const response = await homePageService.fetchSeeMorePageDataForHomePage(
        "Test"
      );

      expect(response).toEqual(mockMovie);
    });

    it("Should fail to load data for See More Page", async () => {
      const errorMessage = "Failed to fetch movies for See More page";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(
        homePageService.fetchMoviesDetailsData("movie123")
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("fetchMoviesDetailsData", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return movie details data by its id", async () => {
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

      const result = await homePageService.fetchMoviesDetailsData("movie123");

      expect(result.movieOrSerialDetails).toEqual(movieDetailResponse);
      expect(result.movieOrSerialActors).toEqual(movieCastResponse);
    });

    it("Should fail to fetch movie details and throw an error with the error message", async () => {
      const errorMessage = "Failed to fetch movie details";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(
        homePageService.fetchMoviesDetailsData("movie123")
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("fetchFavoritesMoviesOrSerials", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    const mockData = {
      success: true,
      data: mockSerialDetails,
    };

    it("Should return favorites movies or serials for a specific user", async () => {
      const mockResponse = mockData;

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const response = await homePageService.fetchFavoritesMoviesOrSerials(
        mockSession.user
      );

      expect(response).toEqual(mockResponse);
    });

    it("Should failed to load favorites movies or serials and call toast with error message", async () => {
      const errorMessage = "Failed to load favorites movies or serials";

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        homePageService.fetchFavoritesMoviesOrSerials(mockSession.user)
      ).rejects.toThrowError(errorMessage);
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

    const mockData = {
      success: true,
      data: mockSerialDetails,
    };

    const mockMethod = RequestMethod.POST;

    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should successfully add to or remove from favorites list", async () => {
      const mockResponse = mockData;

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const response = await homePageService.updateFavoriteMovieOrSerial(
        mockPayload,
        mockMethod
      );

      expect(response).toEqual(mockResponse);
    });

    it("Should failed to update favorites movies or serials", async () => {
      const errorMessage = "Failed to add to or remove from favorites list";

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        homePageService.updateFavoriteMovieOrSerial(mockPayload, mockMethod)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("fetchRatingById", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    const mockData = {
      success: true,
      data: {
        id: 1,
        name: "test_movie",
        rating: 4,
      },
    };

    it("Should successfully fetch rating data by id related to a specific, authenticated user", async () => {
      const mockResponse = mockData;

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const result = await homePageService.fetchRatingById(mockSession.user);

      expect(result).toEqual(mockResponse);
    });

    it("Should failed to load rating data and call toast with error message", async () => {
      const errorMessage = "Failed to load rating data";

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        homePageService.fetchRatingById(mockSession.user)
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("updateMovieOrSerialRating", () => {
    const mockPayload = {
      user: {
        id: "mockUserId",
        name: "John Doe",
        email: "johndoe@example.com",
        image: "https://example.com/avatar.jpg",
      },
      data: {
        id: 1,
        name: "test_movie",
        rating: 6,
      },
    };

    const mockData = {
      success: true,
      data: mockSerialDetails,
    };

    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should successfully add to or remove from favorites list", async () => {
      const mockResponse = mockData;

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse),
      });

      const response = await homePageService.updateMovieOrSerialRating(
        mockPayload.data
      );

      expect(response).toEqual(mockResponse);
    });

    it("Should failed to update favorites movies or serials", async () => {
      const errorMessage = "Failed to update rating";

      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(
        homePageService.updateMovieOrSerialRating(mockPayload.data)
      ).rejects.toThrowError(errorMessage);
    });
  });
});
