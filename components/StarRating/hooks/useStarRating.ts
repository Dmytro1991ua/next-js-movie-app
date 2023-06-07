import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

import { useUpdateMovieOrSerialRating } from "@/hooks/mutations/useUpdateMovieOrSerialRating";
import { Rating } from "@/model/rating";
import { homePageService } from "@/modules/home/home.service";
import { QueryString } from "@/types/enums";
import { convertStarRatingToTMDBRating } from "@/utils/utils";

interface HookProps {
  rating: number;
  colorFilled: string;
  colorUnfilled: string;
  newRating: Pick<Rating, "id" | "name">;
}

interface ReturnedHookType {
  iconHover: number;
  starRatingValue: number;
  onMovieRatingState: (iconRatingValue: number) => void;
  onStartIconMouseEnterEvent: (iconRatingValue: number) => void;
  onStartIconMouseLeaveEvent: () => void;
  getStarIconColor: (starIndex: number) => string;
}

export const useStarRating = ({
  rating,
  colorFilled,
  colorUnfilled,
  newRating,
}: HookProps): ReturnedHookType => {
  const { data: session } = useSession();

  const [starRatingValue, setStarRatingValue] = useState<number>(rating);
  const [iconHover, setIconHover] = useState<number>(0);

  useEffect(() => {
    setStarRatingValue(rating);
  }, [rating]);

  const { mutate: updateRating } = useUpdateMovieOrSerialRating({
    queryKey: QueryString.movieOrSerialRating,
    mutationFn: () => {
      const convertedRating = convertStarRatingToTMDBRating(starRatingValue);

      return homePageService.updateMovieOrSerialRating({
        data: {
          ...newRating,
          rating: convertedRating,
        },
        user: session?.user,
      });
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateRating = useCallback(
    debounce((value: number) => {
      setStarRatingValue(value);
      updateRating();
    }, 300),
    [setStarRatingValue, updateRating]
  );

  const getStarIconColor = useCallback(
    (starIndex: number) =>
      starIndex <= (iconHover || starRatingValue) ? colorFilled : colorUnfilled,
    [colorFilled, colorUnfilled, iconHover, starRatingValue]
  );

  const onMovieRatingState = useCallback(
    (starIconRatingValue: number) => {
      debouncedUpdateRating(starIconRatingValue);
    },
    [debouncedUpdateRating]
  );

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
    iconHover,
    starRatingValue,
    onMovieRatingState,
    onStartIconMouseEnterEvent,
    onStartIconMouseLeaveEvent,
    getStarIconColor,
  };
};
