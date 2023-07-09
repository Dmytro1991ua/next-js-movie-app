import { clsx } from "clsx";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { AppRoutes, SeeMorePageRoutes } from "@/types/enums";

import { useSliderActions } from "./hooks/useSliderActions";
import SliderThumbnail from "./SliderThumbnail";
import Button from "../Button";

export interface SliderProps<T> {
  data: T[];
  title: string;
  className?: string;
  seeMoreRoute?: SeeMorePageRoutes;
  route?: AppRoutes;
}

const Slider = <T extends Movie & Serial>({
  data,
  title,
  className,
  seeMoreRoute,
  route,
}: SliderProps<T>) => {
  const {
    isActionButtonClicked,
    isLoading,
    rowRef,
    onActionIconClick,
    onRedirectToSeeMorePage,
  } = useSliderActions({ seeMoreRoute });

  return (
    <section className={clsx("space-y-0.5 md:space-y-2 pl-[5%]", className)}>
      <div className="flex justify-between items-center pr-2 mb-2">
        <h2 className="slider-header-title">{title}</h2>
        <Button
          isLoading={isLoading}
          size="small"
          variant="primary"
          onClick={onRedirectToSeeMorePage}
        >
          See More
        </Button>
      </div>
      <div className="group relative md:-ml-2">
        <BsChevronLeft
          className={clsx("left-arrow-slider-icon", [
            !isActionButtonClicked && "hidden",
          ])}
          data-testid="arrow-left"
          onClick={() => onActionIconClick("left")}
        />

        <div ref={rowRef} className="slider-wrapper">
          {data.map((item) => (
            <SliderThumbnail
              key={`${item.id}_${item.name || item.title}`}
              data={item}
              route={route}
            />
          ))}
        </div>

        <BsChevronRight
          className="right-arrow-slider-icon"
          data-testid="arrow-right"
          onClick={() => onActionIconClick("right")}
        />
      </div>
    </section>
  );
};

export default Slider;
