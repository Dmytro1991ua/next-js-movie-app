import clsx from "clsx";
import Link from "next/link";
import { NextRouter } from "next/router";

import { Cast, MovieOrSerialDetail } from "@/model/common";
import { MovieOrSerialResults } from "@/types/interfaces";

import { detailsPageActionButtonsConfig, favoritesIconConfig } from "./configs";
import DetailsBlock from "./DetailsBlock";
import { DetailsBlockTitle } from "./enums";
import {
  DetailsBlockWithPillsConfig,
  FavoritesIconProps,
  MovieOrSerialWithRegularSubtitle,
} from "./types";

export const convertRevenueNumberToMoneyFormat = (revenue?: number) => {
  return revenue?.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const getCorrectReleaseOrFirDateAirValue = (
  releaseDate?: string
): DetailsBlockTitle => {
  return releaseDate
    ? DetailsBlockTitle.ReleaseDate
    : DetailsBlockTitle.FirstAirDate;
};

export const getDetailsBlockByConfig = ({
  config,
  movieOrSerialDetails,
  movieOrSerialCast,
}: {
  config: (
    movieOrSerialDetails?: MovieOrSerialDetail,
    movieOrSerialCast?: Cast
  ) => (DetailsBlockWithPillsConfig & MovieOrSerialWithRegularSubtitle)[];
  movieOrSerialDetails?: MovieOrSerialDetail;
  movieOrSerialCast?: Cast;
}): JSX.Element => {
  const configList = config(movieOrSerialDetails, movieOrSerialCast);

  return (
    <>
      {configList.map(
        ({
          id,
          position,
          title,
          className,
          hasSubtitlePill,
          list,
          subtitle,
        }) => (
          <DetailsBlock
            key={id}
            className={className}
            hasSubtitlePill={hasSubtitlePill}
            list={list}
            position={position}
            subtitle={subtitle}
            title={title}
          />
        )
      )}
    </>
  );
};

export const getDetailsPageActionButtons = ({
  movieOrSerialDetails,
  router,
  onPlayBtnClick,
}: {
  movieOrSerialDetails?: MovieOrSerialDetail;
  router: NextRouter;
  onPlayBtnClick: () => void;
}) => {
  const detailsPageActionButtons = detailsPageActionButtonsConfig({
    movieOrSerialDetails,
    router,
    onPlayBtnClick,
  });

  return (
    <>
      {detailsPageActionButtons.map(
        ({
          icon,
          id,
          label,
          url,
          className,
          disabledClassName,
          rel,
          target,
          onClick,
        }) => (
          <Link key={id} passHref href={url}>
            <a
              className={clsx(
                `flex items-center justify-center w-fit	focus:outline-none  focus:ring-2 focus:ring-opacity-50 transition ease-in-out duration-300 rounded-lg ${className}`,
                [!url && disabledClassName]
              )}
              rel={rel}
              style={{ padding: "0.8rem 1.2rem" }}
              target={target}
              onClick={(e) => onClick && onClick(e)}
            >
              {label} {icon}
            </a>
          </Link>
        )
      )}
    </>
  );
};

export const getFavoritesId = (
  favoriteId?: number,
  favorites?: MovieOrSerialResults[] | null
) => favorites?.find((favorite) => favorite.id === favoriteId)?._id;

export const getIsMovieOrSerialInFavorites = (
  favoriteId?: number,
  favorites?: MovieOrSerialResults[] | null
) => favorites?.findIndex((favorite) => favorite.id === favoriteId) !== -1;

export const getFavoritesIcon = ({
  isInFavorites,
  onFavoriteIconClick,
}: FavoritesIconProps): JSX.Element[] => {
  const favoritesConfig = favoritesIconConfig({
    isInFavorites,
    onFavoriteIconClick,
  });

  return favoritesConfig.map(({ id, icon, onClick, isInFavorites }) => (
    <button key={id} onClick={onClick}>
      {isInFavorites && icon}
    </button>
  ));
};
