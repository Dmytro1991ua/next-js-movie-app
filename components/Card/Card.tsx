import Image from "next/image";
import React, { FC } from "react";

import {
  BLURRED_IMAGE,
  STAR_ICON_COLOR_FILLED,
  STAR_ICON_COLOR_UNFILLED,
} from "@/types/constants";
import { AppRoutes } from "@/types/enums";
import { MovieOrSerialResults } from "@/types/interfaces";

import CardContent from "./CardContent/CardContent";
import { useCardState } from "./hooks/useCardState";
import { useStarRating } from "../StarRating/hooks/useStarRating";

interface CardProps {
  movieOrSerialData?: MovieOrSerialResults;
  route: AppRoutes;
}

const Card: FC<CardProps> = ({ movieOrSerialData, route }) => {
  const { imageUrl, initialRatingValue, onHandleRedirectToDetailsPage } =
    useCardState({ movieOrSerialData, route });

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
      id: movieOrSerialData?.id ?? 0,
      name: (movieOrSerialData?.title || movieOrSerialData?.name) ?? "",
    },
  });

  return (
    <div className="group [perspective:1000px] h-[35rem] xs:w-72 sm:w-96 cursor-pointer">
      <div className="card-image-wrapper">
        <div className="absolute inset-0">
          <Image
            alt={movieOrSerialData?.title ?? movieOrSerialData?.name}
            blurDataURL={BLURRED_IMAGE}
            className="rounded-xl shadow-lighterBlue/70"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            src={imageUrl}
          />
        </div>
        <CardContent
          firstAirDate={movieOrSerialData?.first_air_date}
          getStarIconColor={getStarIconColor}
          movieTitle={movieOrSerialData?.title}
          rating={movieOrSerialData?.vote_average}
          releaseDate={movieOrSerialData?.release_date}
          serialName={movieOrSerialData?.name}
          onClick={onHandleRedirectToDetailsPage}
          onMovieRatingState={onMovieRatingState}
          onStartIconMouseEnterEvent={onStartIconMouseEnterEvent}
          onStartIconMouseLeaveEvent={onStartIconMouseLeaveEvent}
        />
      </div>
    </div>
  );
};

export default Card;
