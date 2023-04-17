import React, { FC } from "react";

import Button from "@/components/Button";
import StarRating from "@/components/StarRating";
import {
  DEFAULT_NUMBER_OF_START_ICONS,
  STAR_ICON_COLOR_FILLED,
  STAR_ICON_COLOR_UNFILLED,
} from "@/types/constants";

interface CardContentProps {
  serialName?: string;
  movieTitle?: string;
  rating?: number;
  releaseDate?: string;
  firstAirDate?: string;
  onClick: () => void;
}

const CardContent: FC<CardContentProps> = ({
  serialName,
  movieTitle,
  rating,
  releaseDate,
  firstAirDate,
  onClick,
}) => {
  return (
    <div className="card-content-wrapper">
      <h3 className="mb-2">{movieTitle ?? serialName}</h3>
      <StarRating
        colorFilled={STAR_ICON_COLOR_FILLED}
        colorUnfilled={STAR_ICON_COLOR_UNFILLED}
        numberOfStars={DEFAULT_NUMBER_OF_START_ICONS}
        rating={rating ?? 0}
        size={18}
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
