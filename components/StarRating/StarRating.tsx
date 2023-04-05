import React, { FC, useMemo } from "react";
import { FaStar } from "react-icons/fa";

import { useStarRating } from "./hooks/useStarRating";

interface StarRatingProps {
  numberOfStars: number;
  colorFilled: string;
  colorUnfilled: string;
  rating: number;
  size?: number;
}

const StarRating: FC<StarRatingProps> = ({
  numberOfStars,
  colorFilled,
  colorUnfilled,
  rating,
  size,
}) => {
  const {
    onMovieRatingState,
    onStartIconMouseEnterEvent,
    onStartIconMouseLeaveEvent,
    getStarIconColor,
  } = useStarRating({ rating, colorFilled, colorUnfilled });

  const starRating = useMemo(() => {
    return [...Array(numberOfStars)]
      .map((_, index) => index + 1)
      .map((starIndex) => {
        return (
          <label key={starIndex} data-testid="star-rating">
            <input className="hidden" name="rating" type="radio" />
            <FaStar
              className={"cursor-pointer	transition"}
              color={getStarIconColor(starIndex)}
              data-testid="star-icon"
              size={size}
              onClick={() => onMovieRatingState(starIndex)}
              onMouseEnter={() => onStartIconMouseEnterEvent(starIndex)}
              onMouseLeave={onStartIconMouseLeaveEvent}
            />
          </label>
        );
      });
  }, [
    numberOfStars,
    onMovieRatingState,
    onStartIconMouseEnterEvent,
    onStartIconMouseLeaveEvent,
    size,
    getStarIconColor,
  ]);

  return <div className="flex">{starRating}</div>;
};

export default StarRating;
