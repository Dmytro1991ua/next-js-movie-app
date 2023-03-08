import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

import { AppRoutes } from "@/types/enums";

import PopcornImg from "../../../public/assets/header/popcorn.png";

const Logo: FC = () => {
  return (
    <Link passHref href={AppRoutes.Movies}>
      <a className="relative flex items-center z-10" data-testid="logo">
        <h3 className="text-2xl font-bold mr-0.5">Movie</h3>
        <span className="text-lg font-bold rotate-[-17deg] text-mantis">
          Room
        </span>
        <div className="relative translate-x-[-9.4rem] opacity-80 -z-10">
          <Image
            alt="Popcorn Image"
            height={70}
            objectFit="cover"
            src={PopcornImg}
            width={70}
          />
        </div>
      </a>
    </Link>
  );
};

export default Logo;
