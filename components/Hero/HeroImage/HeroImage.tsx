import Image, { StaticImageData } from "next/image";
import React, { FC, memo, useEffect, useState } from "react";

import { BLURRED_HERO_IMAGE } from "@/types/constants";

import DefaultImage from "../../../public/assets/auth-layout/auth-layout-bg-big.jpg";

interface HeroImageProps {
  imgUrl: string;
}

const HeroImage: FC<HeroImageProps> = ({ imgUrl }) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(DefaultImage);

  useEffect(() => {
    if (imgUrl) {
      setImgSrc(imgUrl);
    }
  }, [imgUrl]);

  return (
    <div className="relative z-0 h-screen w-full p2 drop-shadow-xl">
      <div className="hero-image-overlay" />
      <Image
        alt="Banner image"
        blurDataURL={BLURRED_HERO_IMAGE}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        src={imgSrc}
        onError={() => setImgSrc(DefaultImage)}
      />
    </div>
  );
};

export default memo(HeroImage);
