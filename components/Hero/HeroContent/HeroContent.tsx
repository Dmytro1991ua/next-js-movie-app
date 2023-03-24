import React, { FC, memo } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";

import Button from "@/components/Button";

interface HeroContentProps {
  title?: string;
  releaseDate?: string;
  rating?: number;
  overview?: string;
}

const HeroContent: FC<HeroContentProps> = ({
  title = "",
  releaseDate = "",
  rating = 0,
  overview = "",
}) => {
  return (
    <div className="absolute top-[45%] left-[5%] max-w-6xl text-white xl:max-w-[85rem] 2xl:max-w-[108rem]">
      <h1 className="text-4xl lg:text-6xl lg:leading-tight mb-4">{title}</h1>
      <div className="flex items-cenetr mb-2">
        <p>{releaseDate},&nbsp;</p>
        <p>
          IMDB:&nbsp;
          <span className="text-mantis font-bold">{rating}</span>
        </p>
      </div>
      <p className="mb-4">{overview}</p>
      <Button>{<BsFillInfoCircleFill />}&nbsp;View Details</Button>
    </div>
  );
};

export default memo(HeroContent);
