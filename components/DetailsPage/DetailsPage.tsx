import clsx from "clsx";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import { Cast, MovieOrSerialDetail } from "@/model/common";
import { IMAGE_URL } from "@/types/constants";
import {
  detailsSubtitleWithPillsConfig,
  getDetailsBlockByConfig,
  getDetailsPageActionButtons,
  movieOrSerialReleaseConfig,
  movieOrSerialRevenueOrSeasonsDetailsConfig,
} from "@/utils/utils";

import HeroImage from "../Hero/HeroImage";

interface DetailsPageProps {
  movieOrSerialDetails?: MovieOrSerialDetail;
  movieOrSerialCast?: Cast;
}

const DetailsPage = ({
  movieOrSerialDetails,
  movieOrSerialCast,
}: DetailsPageProps) => {
  const router = useRouter();

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
    () => getDetailsPageActionButtons({ movieOrSerialDetails, router }),
    [movieOrSerialDetails, router]
  );

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
      <div className="details-page-content-wrapper">
        <div className="w-full">
          <h1
            className={clsx("text-2xl lg:text-3xl lg:leading-tight", [
              movieOrSerialDetails?.tagline ? "mb-2" : "mb-4",
            ])}
          >
            {movieOrSerialDetails?.title ?? movieOrSerialDetails?.name}
          </h1>
          <h2 className="opacity-75 mb-4">
            <i>{movieOrSerialDetails?.tagline}</i>
          </h2>
          <div className="flex items-center gap-8 mb-2">
            {detailsBlockWithMovieOrSerialRelease}
          </div>
          <p className="mb-4">{movieOrSerialDetails?.overview}</p>
          <div className="flex items-center gap-8 mb-2">
            {detailsBlockWithRevenueOrSeasonsDetails}
          </div>
          <div className="flex items-center gap-5">
            {detailsPageActionButtons}
          </div>
        </div>
        <div className="w-full">{detailsBlockWithPillsSubtitle}</div>
      </div>
    </section>
  );
};

export default DetailsPage;
