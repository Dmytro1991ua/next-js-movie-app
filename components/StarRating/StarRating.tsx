import React, { FC, useMemo } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  numberOfStars: number;
  size?: number;
  onMovieRatingState: (iconRatingValue: number) => void;
  onStartIconMouseEnterEvent: (iconRatingValue: number) => void;
  onStartIconMouseLeaveEvent: () => void;
  getStarIconColor: (starIndex: number) => string;
}

const StarRating: FC<StarRatingProps> = ({
  numberOfStars,
  size,
  onMovieRatingState,
  onStartIconMouseEnterEvent,
  onStartIconMouseLeaveEvent,
  getStarIconColor,
}) => {
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
