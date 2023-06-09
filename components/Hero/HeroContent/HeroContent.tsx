import React, { FC, memo, useMemo } from "react";

import ReadMore from "@/components/ReadMore";
import StarRating from "@/components/StarRating";
import { useStarRating } from "@/components/StarRating/hooks/useStarRating";
import { Rating } from "@/model/rating";
import {
  DEFAULT_NUMBER_OF_START_ICONS,
  STAR_ICON_COLOR_FILLED,
  STAR_ICON_COLOR_UNFILLED,
} from "@/types/constants";
import { getHeroContentActionButtons } from "@/utils/utils";

interface HeroContentProps {
  initialRatingValue: number;
  newRating: number;
  newRatingData: Pick<Rating, "id" | "name">;
  title?: string;
  releaseDate?: string;
  rating?: number;
  overview?: string;
  isSerialPage?: boolean;
  onDetailsBtnClick: () => void;
  onPlayBtnClick: () => void;
}

const HeroContent: FC<HeroContentProps> = ({
  title = "",
  releaseDate = "",
  rating = 0,
  overview = "",
  newRatingData,
  initialRatingValue,
  newRating,
  onDetailsBtnClick,
  onPlayBtnClick,
}) => {
  const actionButtons = useMemo(
    () => getHeroContentActionButtons({ onDetailsBtnClick, onPlayBtnClick }),
    [onDetailsBtnClick, onPlayBtnClick]
  );

  const {
    onMovieRatingState,
    onStartIconMouseEnterEvent,
    onStartIconMouseLeaveEvent,
    getStarIconColor,
  } = useStarRating({
    rating: initialRatingValue,
    colorFilled: STAR_ICON_COLOR_FILLED,
    colorUnfilled: STAR_ICON_COLOR_UNFILLED,
    newRating: newRatingData,
  });

  return (
    <div className="absolute top-[30%] left-[5%] lg:top-[45%] xl:max-w-[85rem] 2xl:max-w-[108rem]">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="text-4xl leading-none 2xl:text-5xl 2xl:leading-none">
          {title}
        </h1>
        <StarRating
          getStarIconColor={getStarIconColor}
          numberOfStars={DEFAULT_NUMBER_OF_START_ICONS}
          size={28}
          onMovieRatingState={onMovieRatingState}
          onStartIconMouseEnterEvent={onStartIconMouseEnterEvent}
          onStartIconMouseLeaveEvent={onStartIconMouseLeaveEvent}
        />
      </div>
      <div className="flex items-center mb-2">
        <p>{releaseDate},&nbsp;</p>
        <p>
          IMDB:&nbsp;
          <span className="text-mantis font-bold">{rating}</span>
        </p>
      </div>
      {!!newRating && (
        <p className="mb-2">
          My Rating:&nbsp;
          <span className="text-mantis font-bold">{newRating}</span>
        </p>
      )}
      <ReadMore className="mb-8" text={overview} />
      {actionButtons}
    </div>
  );
};

export default memo(HeroContent);
