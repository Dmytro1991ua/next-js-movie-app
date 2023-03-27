import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { BLURRED_IMAGE, SMALL_IMAGE_URL } from "@/types/constants";
import { AppRoutes } from "@/types/enums";

interface SliderThumbnailProps<T> {
  data: T;
  route?: AppRoutes;
}

const SliderThumbnail = <T extends Movie & Serial>({
  data,
  route,
}: SliderThumbnailProps<T>) => {
  const router = useRouter();

  function handleRedirectToDetailsPage(): void {
    router.push(`${route}/${data.id}`);
  }

  return (
    <div
      className=" relative slide-image-wrapper rounded-lg"
      onClick={handleRedirectToDetailsPage}
    >
      <Image
        alt={data.title}
        blurDataURL={BLURRED_IMAGE}
        className="slide-image rounded-lg"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        src={`${SMALL_IMAGE_URL}${data.backdrop_path || data.poster_path}`}
      />
    </div>
  );
};

export default SliderThumbnail;
