import Image from "next/image";
import React from "react";

import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { BLURRED_IMAGE, SMALL_IMAGE_URL } from "@/types/constants";

interface SliderThumbnailProps<T> {
  data: T;
}

const SliderThumbnail = <T extends Movie & Serial>({
  data,
}: SliderThumbnailProps<T>) => {
  return (
    <div className="relative flex flex-col">
      <div className=" relative slide-image-wrapper">
        <Image
          alt={data.title}
          blurDataURL={BLURRED_IMAGE}
          className="slide-image"
          layout="fill"
          placeholder="blur"
          src={`${SMALL_IMAGE_URL}${data.backdrop_path || data.poster_path}`}
        />
      </div>
    </div>
  );
};

export default SliderThumbnail;
