import { clsx } from "clsx";
import React from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { AppRoutes } from "@/types/enums";

import { useSliderActions } from "./hooks/useSliderActions";
import SliderThumbnail from "./SliderThumbnail";

export interface SliderProps<T> {
  data: T[];
  title: string;
  className?: string;
  route?: AppRoutes;
}

const Slider = <T extends Movie & Serial>({
  data,
  title,
  className,
  route,
}: SliderProps<T>) => {
  const { isActionButtonClicked, rowRef, onActionIconClick } =
    useSliderActions();

  return (
    <section className={clsx("space-y-0.5 md:space-y-2 pl-[5%]", className)}>
      <h2 className="slider-header-title ">{title}</h2>
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
            <SliderThumbnail key={uuidv4()} data={item} route={route} />
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
