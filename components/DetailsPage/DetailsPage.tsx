import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useCallback, useMemo } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import { useTrailerState } from "@/hooks/useTrailerState";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import {
  DEFAULT_NUMBER_OF_START_ICONS,
  IMAGE_URL,
  STAR_ICON_COLOR_FILLED,
  STAR_ICON_COLOR_UNFILLED,
} from "@/types/constants";
import { AppRoutes, DetailsPageActionButtons } from "@/types/enums";
import {
  detailsSubtitleWithPillsConfig,
  getDetailsBlockByConfig,
  getDetailsPageActionButtons,
  movieOrSerialReleaseConfig,
  movieOrSerialRevenueOrSeasonsDetailsConfig,
} from "@/utils/utils";

import Button from "../Button";
import HeroImage from "../Hero/HeroImage";
import ReadMore from "../ReadMore";
import Search from "../Search";
import StarRating from "../StarRating";
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
  const router = useRouter();

  const { isTrailerShown, trailerUrl, onTrailerOpening, onTrailerClosing } =
    useTrailerState({
      id: movieOrSerialDetails?.id,
      name: movieOrSerialDetails?.name ?? movieOrSerialDetails?.title,
    });

  const detailsBlockWithPillsSubtitle = useMemo(
    () =>
      getDetailsBlockByConfig({
        config: detailsSubtitleWithPillsConfig,
        movieOrSerialDetails,
        movieOrSerialCast,
      }),
    [movieOrSerialDetails, movieOrSerialCast]
  );

  const detailsBlockWithMovieOrSerialRelease = useMemo(
    () =>
      getDetailsBlockByConfig({
        config: movieOrSerialReleaseConfig,
        movieOrSerialDetails,
        movieOrSerialCast,
      }),
    [movieOrSerialDetails, movieOrSerialCast]
  );

  const detailsBlockWithRevenueOrSeasonsDetails = useMemo(
    () =>
      getDetailsBlockByConfig({
        config: movieOrSerialRevenueOrSeasonsDetailsConfig,
        movieOrSerialDetails,
        movieOrSerialCast,
      }),
    [movieOrSerialDetails, movieOrSerialCast]
  );

  const detailsPageActionButtons = useMemo(
    () =>
      getDetailsPageActionButtons({
        movieOrSerialDetails,
        router,
        onPlayBtnClick: onTrailerOpening,
      }),
    [movieOrSerialDetails, router, onTrailerOpening]
  );

  const handleGoBackRedirect = useCallback(() => router.back(), [router]);

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
            <h1 className="text-2xl leading-none xl:text-3xl 2xl:leading-none">
              {movieOrSerialDetails?.title ?? movieOrSerialDetails?.name}
            </h1>
            <StarRating
              colorFilled={STAR_ICON_COLOR_FILLED}
              colorUnfilled={STAR_ICON_COLOR_UNFILLED}
              numberOfStars={DEFAULT_NUMBER_OF_START_ICONS}
              rating={movieOrSerialDetails?.vote_average ?? 0}
              size={18}
            />
          </div>
          <h2 className="opacity-75 mb-4">
            <i>{movieOrSerialDetails?.tagline}</i>
          </h2>
          <div className="flex items-center gap-8 mb-2">
            {detailsBlockWithMovieOrSerialRelease}
          </div>
          <p className="mb-4">
            <ReadMore text={movieOrSerialDetails?.overview ?? ""} />
          </p>
          <div className="flex items-center gap-8 mb-2">
            {detailsBlockWithRevenueOrSeasonsDetails}
          </div>
          <div className="flex items-center gap-5">
            {detailsPageActionButtons}
            <Button variant="primary" onClick={handleGoBackRedirect}>
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
