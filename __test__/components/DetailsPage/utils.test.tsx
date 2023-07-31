import { fireEvent, render, screen } from "@testing-library/react";
import { NextRouter } from "next/router";
import React from "react";

import {
  detailsPageActionButtonsConfig,
  favoritesIconConfig,
} from "@/components/DetailsPage/configs";
import {
  DetailsBlockTitle,
  DetailsPageActionButtons,
} from "@/components/DetailsPage/enums";
import {
  DetailsPageActionButton,
  FavoritesIconConfigItem,
  MovieOrSerialWithRegularSubtitle,
} from "@/components/DetailsPage/types";
import {
  convertRevenueNumberToMoneyFormat,
  getCorrectReleaseOrFirDateAirValue,
  getDetailsBlockByConfig,
  getDetailsPageActionButtons,
  getFavoritesIcon,
  getFavoritesId,
  getIsMovieOrSerialInFavorites,
} from "@/components/DetailsPage/utils";
import {
  mockMovie,
  mockSerialCast,
  mockSerialDetails,
} from "@/mocks/testMocks";
import { MovieOrSerialResults } from "@/types/interfaces";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("@/components/DetailsPage/configs");

describe("utils", () => {
  const mockMovieId = 965839;
  const mockFavoriteMovieId = "test_favorite_movie_id_1";
  const mockFavoriteMovies = [
    { ...mockMovie, _id: mockFavoriteMovieId },
  ] as MovieOrSerialResults[];

  describe("convertRevenueNumberToMoneyFormat", () => {
    it("should correctly convert revenue number to money format", () => {
      const mockRevenue = 100;
      const mockOutput = "$100.00";

      expect(convertRevenueNumberToMoneyFormat(mockRevenue)).toEqual(
        mockOutput
      );
    });
  });

  describe("getCorrectReleaseOrFirDateAirValue", () => {
    const mockReleaseValue = "test_release_date";

    it("should return release date value if it is exist", () => {
      expect(getCorrectReleaseOrFirDateAirValue(mockReleaseValue)).toEqual(
        DetailsBlockTitle.ReleaseDate
      );
    });

    it("should return first air date if release date does not exist", () => {
      expect(getCorrectReleaseOrFirDateAirValue()).toEqual(
        DetailsBlockTitle.FirstAirDate
      );
    });
  });

  describe("getFavoritesId", () => {
    it("should return a correct favorites movie id", () => {
      const result = getFavoritesId(mockMovieId, mockFavoriteMovies);

      expect(result).toEqual(mockFavoriteMovieId);
    });
  });

  describe("getIsMovieOrSerialInFavorites", () => {
    it("should return true if movie or serial in favorites", () => {
      expect(
        getIsMovieOrSerialInFavorites(mockMovieId, mockFavoriteMovies)
      ).toBe(true);
    });

    it("should return false if movie or serial is not in favorites", () => {
      const mockMovieId = 123;

      expect(
        getIsMovieOrSerialInFavorites(mockMovieId, mockFavoriteMovies)
      ).toBe(false);
    });
  });

  describe("getDetailsBlockByConfig", () => {
    const mockConfig = [
      {
        id: "test_id_1",
        subtitle: "test_subtitle",
        className: "",
        position: "column",
        title: DetailsBlockTitle.Revenue,
      },
    ] as unknown as MovieOrSerialWithRegularSubtitle[];

    it("should correctly render Details block based on corresponding config", () => {
      render(
        getDetailsBlockByConfig({
          config: () => mockConfig,
          movieOrSerialCast: mockSerialCast,
          movieOrSerialDetails: mockSerialDetails,
        })
      );

      expect(screen.getByText("test_subtitle")).toBeInTheDocument();
      expect(
        screen.getByText(`${DetailsBlockTitle.Revenue}:`)
      ).toBeInTheDocument();
    });
  });

  describe("getDetailsPageActionButtons", () => {
    const mockRouter = {
      push: jest.fn(),
    } as unknown as NextRouter;
    const mockOnPlayBtnClick = jest.fn();
    const mockConfig = [
      {
        id: "test_id_1",
        url: "#",
        icon: <p>test icon</p>,
        label: DetailsPageActionButtons.Play,
        className: "bg-lighterBlue hover:bg-blue focus:ring-lighterBlue",
        onClick: () => mockOnPlayBtnClick,
      },
    ] as unknown as DetailsPageActionButton[];

    it("should correctly render details page actions buttons", () => {
      (detailsPageActionButtonsConfig as jest.Mock).mockReturnValue(mockConfig);

      render(
        getDetailsPageActionButtons({
          onPlayBtnClick: mockOnPlayBtnClick,
          router: mockRouter,
          movieOrSerialDetails: mockSerialDetails,
        })
      );

      expect(screen.getByText("test icon")).toBeInTheDocument();
      expect(screen.getByText("Play Trailer")).toBeInTheDocument();
    });
  });

  describe("getFavoritesIcon", () => {
    const mockIsInFavorite = true;
    const mockOnFavoriteIconClick = jest.fn();
    const mockConfig = [
      {
        id: "test_id_1",
        icon: <p>test icon</p>,
        onClick: mockOnFavoriteIconClick,
        isInFavorites: mockIsInFavorite,
      },
    ] as FavoritesIconConfigItem[];

    it("should correctly render favorite icon", () => {
      (favoritesIconConfig as jest.Mock).mockReturnValue(mockConfig);

      render(
        getFavoritesIcon({
          isInFavorites: mockIsInFavorite,
          onFavoriteIconClick: mockOnFavoriteIconClick,
        })
      );

      expect(screen.getByText("test icon")).toBeInTheDocument();
    });

    it("should call onFavoriteIconClick when play button is clicked", () => {
      (favoritesIconConfig as jest.Mock).mockReturnValue(mockConfig);

      render(
        getFavoritesIcon({
          isInFavorites: mockIsInFavorite,
          onFavoriteIconClick: mockOnFavoriteIconClick,
        })
      );

      const favoriteIcon = screen.getByText("test icon");

      fireEvent.click(favoriteIcon);

      expect(mockOnFavoriteIconClick).toHaveBeenCalled();
    });
  });
});
