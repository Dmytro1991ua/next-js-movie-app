import { NextRouter } from "next/router";
import {
  AiFillHeart,
  AiFillPlayCircle,
  AiOutlineHeart,
  AiTwotoneHome,
} from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

import { Cast, MovieOrSerialDetail } from "@/model/common";

import { DetailsBlockTitle, DetailsPageActionButtons } from "./enums";
import {
  DetailsBlockWithPillsConfig,
  DetailsPageActionButton,
  FavoritesIconConfigItem,
  FavoritesIconProps,
  MovieOrSerialWithRegularSubtitle,
} from "./types";
import {
  convertRevenueNumberToMoneyFormat,
  getCorrectReleaseOrFirDateAirValue,
} from "./utils";

export const detailsSubtitleWithPillsConfig = (
  movieOrSerialDetails?: MovieOrSerialDetail,
  movieCast?: Cast
): DetailsBlockWithPillsConfig[] => {
  const commonClassName = "mb-4";

  return [
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      className: commonClassName,
      list: movieOrSerialDetails?.genres ?? [],
      position: "column",
      title: DetailsBlockTitle.Genres,
    },
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      className: commonClassName,
      list: movieCast?.cast ?? [],
      position: "column",
      title: DetailsBlockTitle.Casts,
    },
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      className: commonClassName,
      list: movieOrSerialDetails?.spoken_languages ?? [],
      position: "column",
      title: DetailsBlockTitle.SpokenLanguages,
    },
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      className: commonClassName,
      list: movieOrSerialDetails?.production_countries ?? [],
      position: "column",
      title: DetailsBlockTitle.ProductionCountries,
    },
    {
      id: uuidv4(),
      hasSubtitlePill: true,
      list: movieOrSerialDetails?.production_companies ?? [],
      position: "column",
      title: DetailsBlockTitle.ProductionCompanies,
    },
  ];
};

export const movieOrSerialReleaseConfig = (
  movieOrSerialDetails?: MovieOrSerialDetail
): MovieOrSerialWithRegularSubtitle[] => {
  const commonClassName = "mr-8";

  return [
    {
      id: uuidv4(),
      subtitle:
        movieOrSerialDetails?.release_date ??
        movieOrSerialDetails?.first_air_date ??
        "",
      className: commonClassName,
      position: "column",
      title: getCorrectReleaseOrFirDateAirValue(
        movieOrSerialDetails?.release_date
      ),
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.last_air_date,
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.LastAirDate,
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.vote_average ?? 0,
      position: "column",
      title: DetailsBlockTitle.IMDB,
    },
  ];
};

export const movieOrSerialRevenueOrSeasonsDetailsConfig = (
  movieOrSerialDetails?: MovieOrSerialDetail
): MovieOrSerialWithRegularSubtitle[] => {
  const commonClassName = "mr-2: xs:mr-4 sm: mr-8";

  return [
    {
      id: uuidv4(),
      subtitle: convertRevenueNumberToMoneyFormat(
        movieOrSerialDetails?.revenue
      ),
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.Revenue,
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.number_of_seasons,
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.NumberOfSeasons,
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.number_of_episodes,
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.NumberOfEpisodes,
    },
    {
      id: uuidv4(),
      subtitle: `${
        movieOrSerialDetails?.runtime ??
        movieOrSerialDetails?.episode_run_time?.[0] ??
        []
      }`,
      className: commonClassName,
      position: "column",
      title: DetailsBlockTitle.Runtime,
    },
    {
      id: uuidv4(),
      subtitle: movieOrSerialDetails?.status,
      position: "column",
      title: DetailsBlockTitle.Status,
    },
  ];
};

export const detailsPageActionButtonsConfig = ({
  movieOrSerialDetails,
  onPlayBtnClick,
}: {
  movieOrSerialDetails?: MovieOrSerialDetail;
  router: NextRouter;
  onPlayBtnClick: () => void;
}): DetailsPageActionButton[] => {
  const commonIconClassName = "ml-2";

  return [
    {
      id: uuidv4(),
      url: movieOrSerialDetails?.homepage ?? "",
      icon: <AiTwotoneHome className={commonIconClassName} />,
      rel: "noreferrer",
      target: "_blank",
      label: DetailsPageActionButtons.HomePage,
      className: "bg-lighterBlue hover:bg-blue focus:ring-lighterBlue",
      disabledClassName: !movieOrSerialDetails?.homepage
        ? "pointer-events-none opacity-50"
        : "pointer-events-auto",
    },
    {
      id: uuidv4(),
      url: "#",
      icon: <AiFillPlayCircle className={commonIconClassName} />,
      label: DetailsPageActionButtons.Play,
      className: "bg-lighterBlue hover:bg-blue focus:ring-lighterBlue",
      onClick: (e) => {
        e.preventDefault();
        onPlayBtnClick();
      },
    },
  ];
};

export const favoritesIconConfig = ({
  isInFavorites,
  onFavoriteIconClick,
}: FavoritesIconProps): FavoritesIconConfigItem[] => {
  const commonStyles = "text-2xl text-mantis";

  return [
    {
      id: uuidv4(),
      icon: <AiFillHeart className={commonStyles} />,
      onClick: onFavoriteIconClick,
      isInFavorites,
    },
    {
      id: uuidv4(),
      icon: <AiOutlineHeart className={commonStyles} />,
      onClick: onFavoriteIconClick,
      isInFavorites: !isInFavorites,
    },
  ];
};
