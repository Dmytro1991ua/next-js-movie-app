import React, { FC } from "react";

import Button from "@/components/Button";
import StarRating from "@/components/StarRating";
import { DEFAULT_NUMBER_OF_START_ICONS } from "@/types/constants";

export interface CardContentProps {
  serialName?: string;
  movieTitle?: string;
  rating?: number;
  releaseDate?: string;
  firstAirDate?: string;
  onClick: () => void;
  getStarIconColor: (starIndex: number) => string;
  onMovieRatingState: (iconRatingValue: number) => void;
  onStartIconMouseEnterEvent: (iconRatingValue: number) => void;
  onStartIconMouseLeaveEvent: () => void;
}

const CardContent: FC<CardContentProps> = ({
  serialName,
  movieTitle,
  rating,
  releaseDate,
  firstAirDate,
  onClick,
  getStarIconColor,
  onMovieRatingState,
  onStartIconMouseEnterEvent,
  onStartIconMouseLeaveEvent,
}) => {
  return (
    <div className="card-content-wrapper">
      <h3 className="mb-2">{movieTitle ?? serialName}</h3>
      <StarRating
        getStarIconColor={getStarIconColor}
        numberOfStars={DEFAULT_NUMBER_OF_START_ICONS}
        size={18}
        onMovieRatingState={onMovieRatingState}
        onStartIconMouseEnterEvent={onStartIconMouseEnterEvent}
        onStartIconMouseLeaveEvent={onStartIconMouseLeaveEvent}
      />
      <div className="flex items-center mb-4 mt-4">
        <p>
          {releaseDate ?? firstAirDate}
          ,&nbsp;
        </p>
        <p>
          IMDB:&nbsp;
          <span className="text-mantis font-bold">{rating}</span>
        </p>
      </div>
      <Button variant="primary" onClick={onClick}>
        See Details
      </Button>
    </div>
  );
};

export default CardContent;
