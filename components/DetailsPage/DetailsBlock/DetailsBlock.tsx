import clsx from "clsx";
import React from "react";

import {
  Actor,
  Genre,
  ProductionCountryOrCompany,
  SpokenLanguage,
} from "@/model/common";

import { DetailsBlockPosition } from "../types";

interface DetailsBlockProps<T> {
  title: string;
  subtitle?: string | number;
  list?: T[];
  position: DetailsBlockPosition;
  className?: string;
  hasSubtitlePill?: boolean;
}

const DetailsBlock = <
  T extends Genre | Actor | SpokenLanguage | ProductionCountryOrCompany
>({
  title,
  subtitle,
  position,
  className,
  list,
  hasSubtitlePill,
}: DetailsBlockProps<T>) => {
  return (
    <div
      className={clsx(
        "flex mb-2",
        [
          position === "column" ? "flex-col" : "flex-row",
          !!list?.length || subtitle ? "flex" : "hidden",
        ],
        className
      )}
    >
      <p className="font-bold mb-1.5">{title}:&nbsp;</p>
      {hasSubtitlePill && (
        <div className="flex items-center flex-wrap">
          {list
            ?.filter((item) => item.name)
            .map((item, index) => (
              <p
                key={item.id ?? index}
                className="mr-4 mb-2 px-2 py-1 bg-lighterBlue rounded-xl text-white text-sm w-fit"
              >
                {item.name}
              </p>
            ))}
        </div>
      )}
      <p className="flex text-mantis mr-2">{subtitle}</p>
    </div>
  );
};

export default DetailsBlock;
