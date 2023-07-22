import { mockMovie } from "@/mocks/testMocks";
import { moviesPageService } from "@/modules/movies/movies.service";

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
});
