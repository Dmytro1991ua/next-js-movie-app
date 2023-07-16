import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

import Loader from "@/components/Loader";
import { useButtonAction } from "@/hooks/useButtonAction";
import { useRedirectStatus } from "@/hooks/useRedirectStatus";
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

  const isLoading = useRedirectStatus();
  const { clickedButtonId, onHandleButtonClick } = useButtonAction();

  const isRedirectingToDetailsPage = isLoading && clickedButtonId === data.id;

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
      className="relative flex items-center justify-center slide-image-wrapper rounded-lg"
      onClick={() =>
        onHandleButtonClick(data.id, () =>
          handleRedirectToDetailsPage({ router, route, id: data.id })
        )
      }
    >
      {isRedirectingToDetailsPage && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader
            circleColor="#5a803d"
            height={5.75}
            pathColor="#7ac142"
            width={5.75}
          />
        </div>
      )}
      <Image
        alt={data.title}
        blurDataURL={BLURRED_IMAGE}
        className={clsx("slide-image rounded-lg", [
          isRedirectingToDetailsPage && "brightness-50",
        ])}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        src={imageUrl}
      />
    </div>
  );
};

export default SliderThumbnail;
