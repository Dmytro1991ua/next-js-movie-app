import clsx from "clsx";
import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import { useButtonAction } from "@/hooks/ueButtonAction";
import { useRedirectStatus } from "@/hooks/useRedirectStatus";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import {
  DEFAULT_NUMBER_OF_START_ICONS,
  IMAGE_URL,
  STAR_ICON_COLOR_FILLED,
  STAR_ICON_COLOR_UNFILLED,
} from "@/types/constants";
import { AppRoutes, DetailsPageActionButtons } from "@/types/enums";

import { useDetailsPage } from "./hooks/useDetailsPage";
import Button from "../Button";
import HeroImage from "../Hero/HeroImage";
import ReadMore from "../ReadMore";
import Search from "../Search";
import StarRating from "../StarRating";
import { useStarRating } from "../StarRating/hooks/useStarRating";
import VideoPlayer from "../VideoPlayer";

interface DetailsPageProps {
  movieOrSerialDetails?: MovieOrSerialDetail;
  movieOrSerialCast?: Cast;
  searchPath?: AppRoutes;
  placeholder?: string;
}

const DetailsPage = ({
  movieOrSerialDetails,
  movieOrSerialCast,
  searchPath,
  placeholder,
}: DetailsPageProps) => {
  const isLoading = useRedirectStatus();
  const { clickedButtonId, onHandleButtonClick } = useButtonAction();

  const {
    detailsBlockWithMovieOrSerialRelease,
    detailsBlockWithPillsSubtitle,
    detailsBlockWithRevenueOrSeasonsDetails,
    detailsPageActionButtons,
    isTrailerShown,
    trailerUrl,
    favoriteIcon,
    initialRatingValue,
    newRating,
    onGoBackRedirect,
    onTrailerClosing,
  } = useDetailsPage({
    movieOrSerialDetails,
    movieOrSerialCast,
  });

  const {
    onMovieRatingState,
    onStartIconMouseEnterEvent,
    onStartIconMouseLeaveEvent,
    getStarIconColor,
  } = useStarRating({
    rating: initialRatingValue,
    colorFilled: STAR_ICON_COLOR_FILLED,
    colorUnfilled: STAR_ICON_COLOR_UNFILLED,
    newRating: {
      id: movieOrSerialDetails?.id ?? 0,
      name: (movieOrSerialDetails?.title || movieOrSerialDetails?.name) ?? "",
    },
  });

  return (
    <section className="relative min-h-screen">
      <div className="hero-image-wrapper">
        <HeroImage
          imgUrl={`${IMAGE_URL}${
            movieOrSerialDetails?.backdrop_path ??
            movieOrSerialDetails?.poster_path
          }`}
        />
      </div>
      <div className="details-page-content-wrapper flex-col">
        <Search
          isDetailsPage
          className="mb-14"
          placeholder={placeholder}
          searchPath={searchPath ?? AppRoutes.Default}
        />
        <div className="w-full">
          <div
            className={clsx("flex flex-col items-start gap-2 mb-6", [
              movieOrSerialDetails?.tagline ? "mb-4" : "mb-6",
            ])}
          >
            <div className="flex items-center">
              <h1 className="text-2xl leading-none xl:text-3xl 2xl:leading-none mr-4">
                {movieOrSerialDetails?.title ?? movieOrSerialDetails?.name}
              </h1>
              {favoriteIcon}
            </div>
            <StarRating
              getStarIconColor={getStarIconColor}
              numberOfStars={DEFAULT_NUMBER_OF_START_ICONS}
              size={18}
              onMovieRatingState={onMovieRatingState}
              onStartIconMouseEnterEvent={onStartIconMouseEnterEvent}
              onStartIconMouseLeaveEvent={onStartIconMouseLeaveEvent}
            />
          </div>
          <h2 className="opacity-75 mb-4">
            <i>{movieOrSerialDetails?.tagline}</i>
          </h2>
          <div className="flex items-center gap-8 mb-2">
            {detailsBlockWithMovieOrSerialRelease}
            {!!newRating && (
              <p className="flex flex-col mb-2">
                My Rating:&nbsp;
                <span className="text-mantis font-bold">{newRating}</span>
              </p>
            )}
          </div>
          <p className="mb-4">
            <ReadMore text={movieOrSerialDetails?.overview ?? ""} />
          </p>
          <div className="flex items-center gap-8 mb-2">
            {detailsBlockWithRevenueOrSeasonsDetails}
          </div>
          <div className="flex items-center gap-5">
            {detailsPageActionButtons}
            <Button
              isLoading={
                isLoading && clickedButtonId === movieOrSerialDetails?.id
              }
              variant="primary"
              onClick={() =>
                onHandleButtonClick(
                  movieOrSerialDetails?.id as number,
                  onGoBackRedirect
                )
              }
            >
              {DetailsPageActionButtons.GoBack}
              <BsFillArrowLeftCircleFill className="ml-2" />
            </Button>
          </div>
        </div>
        <div className="w-full">{detailsBlockWithPillsSubtitle}</div>
      </div>
      {isTrailerShown && trailerUrl && (
        <VideoPlayer trailerUrl={trailerUrl} onClose={onTrailerClosing} />
      )}
    </section>
  );
};

export default DetailsPage;
