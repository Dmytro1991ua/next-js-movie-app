import movieTrailer from "movie-trailer";
import { InfiniteData } from "react-query";

import {
  getMovieOrSerialDataLength,
  getMoviesOrSerialsPageData,
  getSearchPageTitle,
  getSeeMorePageTitle,
  getTrailerUrl,
  getWarningMessageWhenTrailerNotFound,
  getYoutubeMovieOrSerialId,
} from "@/hooks/utils";
import * as utils from "@/hooks/utils";
import { mockMovie } from "@/mocks/testMocks";
import { toastService } from "@/services/toast.service";
import { SliderTitle } from "@/types/enums";
import { MovieOrSerialResult } from "@/types/interfaces";

jest.mock("movie-trailer");

describe("utils", () => {
  const mockQueryResponse = {
    pages: [
      {
        page: 1,
        results: [mockMovie],
        total_pages: 20,
        total_results: 100,
      },
    ],
    pageParams: [null],
  } as unknown as InfiniteData<MovieOrSerialResult | null>;

  describe("getWarningMessageWhenTrailerNotFound", () => {
    it("should return correct warning message when a movie/serial trailer was not found", () => {
      const mockOutput = "No trailers found for test_movie_name";

      expect(getWarningMessageWhenTrailerNotFound("test_movie_name")).toEqual(
        mockOutput
      );
    });
  });

  describe("getYoutubeMovieOrSerialId", () => {
    const mockOnSetTrailerUrl = jest.fn();

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should extract the video ID from a valid YouTube URL", () => {
      const mockValidUrl = "https://www.youtube.com/watch?v=abcd1234";

      jest.spyOn(URL.prototype, "search", "get").mockReturnValue("?v=abcd1234");

      getYoutubeMovieOrSerialId(mockValidUrl, mockOnSetTrailerUrl);

      expect(mockOnSetTrailerUrl).toHaveBeenCalledWith("abcd1234");
    });

    it('should call onSetTrailerUrl with null if the "v" parameter is not present', () => {
      const mockInvalidUrl = "https://www.youtube.com/watch";

      jest.spyOn(URL.prototype, "search", "get").mockReturnValue("");

      getYoutubeMovieOrSerialId(mockInvalidUrl, mockOnSetTrailerUrl);

      expect(mockOnSetTrailerUrl).toHaveBeenCalledWith(null);
    });
  });

  describe("getTrailerUrl", () => {
    const mockOnSetTrailer = jest.fn();
    const mockedUrl = "https://www.youtube.com/watch?v=abcd1234";
    const testId = "test-id";

    const defaultProps = {
      message: "test_message",
      onSetTrailer: mockOnSetTrailer,
      id: testId,
    };

    const getYoutubeMovieOrSerialIdMock = jest.fn();

    beforeEach(() => {
      jest
        .spyOn(utils, "getYoutubeMovieOrSerialId")
        .mockImplementation(getYoutubeMovieOrSerialIdMock);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should call movieTrailer with the correct parameters and not call warn", async () => {
      (movieTrailer as jest.Mock).mockResolvedValueOnce(mockedUrl);

      const mockWarn = jest.spyOn(toastService, "warn");

      await getTrailerUrl({
        ...defaultProps,
      });

      expect(movieTrailer).toHaveBeenCalledWith(null, { tmdbId: testId });
      expect(mockWarn).not.toHaveBeenCalled();
    });

    it("should call toastService.warn when movieTrailer resolves with an empty URL", async () => {
      (movieTrailer as jest.Mock).mockResolvedValueOnce("");

      const mockWarn = jest.spyOn(toastService, "warn");

      await getTrailerUrl({
        ...defaultProps,
      });

      expect(mockWarn).toHaveBeenCalledWith(defaultProps.message);
      expect(utils.getYoutubeMovieOrSerialId).not.toHaveBeenCalled();
    });

    it("should call onSetTrailer with null when movieTrailer rejects", async () => {
      (movieTrailer as jest.Mock).mockRejectedValueOnce(
        new Error("Test error")
      );

      await getTrailerUrl({
        ...defaultProps,
      });

      expect(mockOnSetTrailer).toHaveBeenCalledWith(null);
      expect(utils.getYoutubeMovieOrSerialId).not.toHaveBeenCalled();
    });
  });

  describe("getMoviesOrSerialsPageData", () => {
    it("should correctly return movies or serials for data See More page", () => {
      expect(getMoviesOrSerialsPageData({ ...mockQueryResponse })).toEqual([
        mockMovie,
      ]);
    });
  });

  describe("getSeeMorePageTitle", () => {
    it("should correctly return a correct See more page for movies", () => {
      const mockOutput = `${SliderTitle.ActionMovies} Movies`;
      expect(
        getSeeMorePageTitle({
          title: SliderTitle.ActionMovies,
          isMovie: true,
        })
      ).toEqual(mockOutput);
    });

    it("should correctly return a correct See more page for serials", () => {
      const mockOutput = `${SliderTitle.SerialsOnAir} Serials`;

      expect(
        getSeeMorePageTitle({
          title: SliderTitle.SerialsOnAir,
          isMovie: false,
        })
      ).toEqual(mockOutput);
    });
  });

  describe("getSearchPageTitle", () => {
    it("should return correct title for a Search page", () => {
      const mockSearchParam = "test_search_param";
      const mockTotalSearchResults = 20;
      const mockOutput = `Found ${mockTotalSearchResults} results for '${mockSearchParam}'`;

      expect(
        getSearchPageTitle({
          searchParam: "test_search_param",
          totalSearchResults: 20,
        })
      ).toEqual(mockOutput);
    });
  });

  describe("getMovieOrSerialDataLength", () => {
    const defaultProps = {
      ...mockQueryResponse,
      pages: mockQueryResponse.pages.map((responsePage) => ({
        ...responsePage,
        page: 5,
        results: [mockMovie, mockMovie],
      })),
    } as unknown as InfiniteData<MovieOrSerialResult | null>;

    it("should return correct movies or serials data length", () => {
      expect(getMovieOrSerialDataLength({ ...defaultProps })).toEqual(2);
    });
  });
});
