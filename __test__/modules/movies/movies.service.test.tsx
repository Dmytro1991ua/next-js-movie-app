import { mockMovie } from "@/mocks/testMocks";
import { moviesPageService } from "@/modules/movies/movies.service";
import { AppRoutes } from "@/types/enums";

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

describe("MoviesPageService", () => {
  describe("fetchMoviesByGenre", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return movies by genre for Movies Page", async () => {
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
        } as unknown as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(mockMovie),
        } as unknown as Response);

      const response = await moviesPageService.fetchMoviesByGenre();

      expect(response.actionMovies).toEqual(mockMovie);
      expect(response.comedyMovies).toEqual(mockMovie);
    });

    it("should failed to load movies by genre and call toast with error message", async () => {
      const errorMessage = "Failed to fetch movies by genre";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(moviesPageService.fetchMoviesByGenre()).rejects.toThrowError(
        errorMessage
      );
    });
  });

  describe("fetchSeeMorePageDataForMoviesPage", () => {
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
        await moviesPageService.fetchSeeMorePageDataForMoviesPage("Test");

      expect(response).toEqual(mockMovie);
    });

    it("Should fail to load data for See More Page", async () => {
      const errorMessage = "Failed to fetch movies by genre for See More page";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(
        moviesPageService.fetchSeeMorePageDataForMoviesPage("Test")
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("fetchMoviesByGenreDetailsData", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return details data for movies by genre", async () => {
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

      const response = await moviesPageService.fetchMoviesByGenreDetailsData();

      expect(response.movieOrSerialDetails).toEqual(movieDetailResponse);
      expect(response.movieOrSerialActors).toEqual(movieCastResponse);
    });

    it("should failed to load movies by genre details by genre and call toast with error message", async () => {
      const errorMessage = "Failed to fetch movie details";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(
        moviesPageService.fetchMoviesByGenreDetailsData()
      ).rejects.toThrowError(errorMessage);
    });
  });

  describe("fetchDataForSearchPage", () => {
    beforeEach(() => {
      (window.fetch as jest.Mock) = jest.fn();
    });

    afterEach(() => {
      (window.fetch as jest.Mock).mockReset();
    });

    it("Should return searched movies or serials", async () => {
      (window.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockMovie),
      });

      const response = await moviesPageService.fetchDataForSearchPage({
        searchPath: AppRoutes.Movies,
        searchParam: "test_search_param",
      });

      expect(response).toEqual(mockMovie);
    });

    it("should failed to load searched movies or serials", async () => {
      const errorMessage = "Failed to fetch data based on search parameter";

      jest
        .spyOn(global, "fetch")
        .mockImplementation(() => Promise.reject(new Error(errorMessage)));

      await expect(
        moviesPageService.fetchDataForSearchPage({
          searchPath: AppRoutes.Movies,
          searchParam: "test_search_param",
        })
      ).rejects.toThrowError(errorMessage);
    });
  });
});
