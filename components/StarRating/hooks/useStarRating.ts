import { useCallback, useEffect, useState } from "react";

interface HookProps {
  rating: number;
  colorFilled: string;
  colorUnfilled: string;
}

interface ReturnedHookType {
  starRatingValue: number;
  iconHover: number;
  onMovieRatingState: (iconRatingValue: number) => void;
  onStartIconMouseEnterEvent: (iconRatingValue: number) => void;
  onStartIconMouseLeaveEvent: () => void;
  getStarIconColor: (starIndex: number) => string;
}

export const useStarRating = ({
  rating,
  colorFilled,
  colorUnfilled,
}: HookProps): ReturnedHookType => {
  const [starRatingValue, setStarRatingValue] = useState<number>(0);
  const [iconHover, setIconHover] = useState<number>(0);

  useEffect(() => {
    setStarRatingValue(Math.round(rating / 2));
  }, [rating]);

  const getStarIconColor = useCallback(
    (starIndex: number) =>
      starIndex <= (iconHover || starRatingValue) ? colorFilled : colorUnfilled,
    [colorFilled, colorUnfilled, iconHover, starRatingValue]
  );

  const onMovieRatingState = useCallback((starIconRatingValue: number) => {
    setStarRatingValue(starIconRatingValue);
  }, []);

  const onStartIconMouseEnterEvent = useCallback(
    (starIconRatingValue: number) => {
      setIconHover(starIconRatingValue);
    },
    []
  );

  const onStartIconMouseLeaveEvent = useCallback(() => {
    setIconHover(0);
  }, []);

  return {
    starRatingValue,
    iconHover,
    onMovieRatingState,
    onStartIconMouseEnterEvent,
    onStartIconMouseLeaveEvent,
    getStarIconColor,
  };
};
