import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";

import { BLURRED_IMAGE, SMALL_IMAGE_URL } from "@/types/constants";
import { AppRoutes } from "@/types/enums";
import { MovieOrSerialResults } from "@/types/interfaces";
import { handleRedirectToDetailsPage } from "@/utils/utils";

import CardContent from "./CardContent/CardContent";

interface CardProps {
  movieOrSerialData?: MovieOrSerialResults;
  route: AppRoutes;
}

const Card: FC<CardProps> = ({ movieOrSerialData, route }) => {
  const router = useRouter();

  const onHandleRedirectToDetailsPage = useCallback(
    () =>
      handleRedirectToDetailsPage({
        router,
        route,
        id: movieOrSerialData?.id,
      }),
    [movieOrSerialData?.id, route, router]
  );

  return (
    <div className="group [perspective:1000px] h-[35rem] xs:w-72 sm:w-96 cursor-pointer">
      <div className="card-image-wrapper">
        <div className="absolute inset-0">
          <Image
            alt={movieOrSerialData?.title ?? movieOrSerialData?.name}
            blurDataURL={BLURRED_IMAGE}
            className="rounded-xl shadow-lighterBlue/70"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            src={`${SMALL_IMAGE_URL}${
              movieOrSerialData?.poster_path ?? movieOrSerialData?.backdrop_path
            }`}
          />
        </div>
        <CardContent
          firstAirDate={movieOrSerialData?.first_air_date}
          movieTitle={movieOrSerialData?.title}
          rating={movieOrSerialData?.vote_average}
          releaseDate={movieOrSerialData?.release_date}
          serialName={movieOrSerialData?.name}
          onClick={onHandleRedirectToDetailsPage}
        />
      </div>
    </div>
  );
};

export default Card;
