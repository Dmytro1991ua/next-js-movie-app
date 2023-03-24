import { clsx } from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useMemo } from "react";

import useScrollPosition from "@/hooks/useScrollPosition";
import { AppRoutes } from "@/types/enums";

import PopcornImg from "../../../public/assets/header/popcorn.png";
import {
  DEFAULT_LOGO_IMAGE_MEASUREMENT,
  SCROLLED_LOGO_IMAGE_MEASUREMENT,
} from "../header.constants";
import { getScrolledImageMeasurements } from "../header.utils";

const Logo: FC = () => {
  const { isHeaderScrolled } = useScrollPosition();

  const scrolledAvatarMeasurement = useMemo(
    () =>
      getScrolledImageMeasurements({
        isHeaderScrolled,
        defaultMeasurement: DEFAULT_LOGO_IMAGE_MEASUREMENT,
        scrolledMeasurement: SCROLLED_LOGO_IMAGE_MEASUREMENT,
      }),
    [isHeaderScrolled]
  );

  return (
    <Link passHref href={AppRoutes.Home}>
      <a
        className="relative flex items-center mr-[5rem] z-10"
        data-testid="logo"
      >
        <h3 className="text-2xl font-bold mr-0.5">Movie</h3>
        <span className="text-lg font-bold rotate-[-17deg] text-mantis">
          Room
        </span>
        <div
          className={clsx("absolute right-[25%] opacity-80 -z-10", [
            isHeaderScrolled ? "top-[-33%]" : "top-[-50%]",
          ])}
        >
          <Image
            alt="Popcorn Image"
            height={scrolledAvatarMeasurement}
            objectFit="cover"
            src={PopcornImg}
            width={scrolledAvatarMeasurement}
          />
        </div>
      </a>
    </Link>
  );
};

export default Logo;
