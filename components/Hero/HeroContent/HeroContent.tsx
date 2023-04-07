import React, { FC, memo } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";

import Button from "@/components/Button";
import ReadMore from "@/components/ReadMore";
import StarRating from "@/components/StarRating";
import {
  DEFAULT_NUMBER_OF_START_ICONS,
  STAR_ICON_COLOR_FILLED,
  STAR_ICON_COLOR_UNFILLED,
} from "@/types/constants";

interface HeroContentProps {
  title?: string;
  releaseDate?: string;
  rating?: number;
  overview?: string;
  onClick: () => void;
}

const HeroContent: FC<HeroContentProps> = ({
  title = "",
  releaseDate = "",
  rating = 0,
  overview = "",
  onClick,
}) => {
  return (
    <div className="absolute top-[30%] left-[5%] lg:top-[45%] xl:max-w-[85rem] 2xl:max-w-[108rem]">
      <div className="flex flex-col items-start gap-4 mb-8">
        <h1 className="text-4xl leading-none 2xl:text-5xl 2xl:leading-none">
          {title}
        </h1>
        <StarRating
          colorFilled={STAR_ICON_COLOR_FILLED}
          colorUnfilled={STAR_ICON_COLOR_UNFILLED}
          numberOfStars={DEFAULT_NUMBER_OF_START_ICONS}
          rating={rating}
          size={28}
        />
      </div>
      <div className="flex items-cenetr mb-2">
        <p>{releaseDate},&nbsp;</p>
        <p>
          IMDB:&nbsp;
          <span className="text-mantis font-bold">{rating}</span>
        </p>
      </div>
      <ReadMore className="mb-8" text={overview} />
      <Button onClick={onClick}>
        {<BsFillInfoCircleFill />}&nbsp;View Details
      </Button>
    </div>
  );
};

export default memo(HeroContent);
