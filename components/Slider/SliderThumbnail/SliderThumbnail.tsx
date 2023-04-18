import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { BLURRED_IMAGE } from "@/types/constants";
import { AppRoutes } from "@/types/enums";
import { getImageUrl, handleRedirectToDetailsPage } from "@/utils/utils";

interface SliderThumbnailProps<T> {
  data: T;
  route?: AppRoutes;
}

const SliderThumbnail = <T extends Movie & Serial>({
  data,
  route,
}: SliderThumbnailProps<T>) => {
  const router = useRouter();

  const imageUrl = useMemo(
    () =>
      getImageUrl({
        posterPath: data.poster_path,
        backdropPath: data.backdrop_path,
      }),
    [data.backdrop_path, data.poster_path]
  );

  return (
    <div
      className="relative slide-image-wrapper rounded-lg"
      onClick={() =>
        handleRedirectToDetailsPage({ router, route, id: data.id })
      }
    >
      <Image
        alt={data.title}
        blurDataURL={BLURRED_IMAGE}
        className="slide-image rounded-lg"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        src={imageUrl}
      />
    </div>
  );
};

export default SliderThumbnail;
