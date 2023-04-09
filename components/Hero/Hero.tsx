import { useRouter } from "next/router";
import React, { memo, useCallback } from "react";

import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import { useTrailerState } from "@/hooks/useTrailerState";
import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { IMAGE_URL } from "@/types/constants";
import { AppRoutes } from "@/types/enums";
import { handleRedirectToDetailsPage } from "@/utils/utils";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

interface HeroProps<T> {
  data: T[];
  isSerialsPage?: boolean;
  route?: AppRoutes;
}

const Hero = <T extends Movie & Serial>({
  data,
  isSerialsPage = false,
  route,
}: HeroProps<T>) => {
  const { randomMovieOrSerial } = useGetRandomMovieOrSerial({ data });
  const { isTrailerShown, trailerUrl, onTrailerOpening, onTrailerClosing } =
    useTrailerState({
      id: randomMovieOrSerial?.id,
      name: randomMovieOrSerial?.name ?? randomMovieOrSerial?.title,
    });

  const router = useRouter();

  const onHandleRedirectToDetailsPage = useCallback(
    () =>
      handleRedirectToDetailsPage({
        router,
        route,
        id: randomMovieOrSerial?.id,
      }),
    [randomMovieOrSerial?.id, route, router]
  );

  return (
    <section className="relative min-h-screen overflow-x-hidden">
      <div className="hero-image-wrapper">
        <HeroImage
          imgUrl={`${IMAGE_URL}${randomMovieOrSerial?.backdrop_path}`}
        />
      </div>
      <HeroContent
        overview={randomMovieOrSerial?.overview}
        rating={randomMovieOrSerial?.vote_average}
        releaseDate={
          isSerialsPage
            ? randomMovieOrSerial?.first_air_date
            : randomMovieOrSerial?.release_date
        }
        title={
          isSerialsPage ? randomMovieOrSerial?.name : randomMovieOrSerial?.title
        }
        onDetailsBtnClick={onHandleRedirectToDetailsPage}
        onPlayBtnClick={onTrailerOpening}
      />
      {isTrailerShown && trailerUrl && (
        <VideoPlayer trailerUrl={trailerUrl} onClose={onTrailerClosing} />
      )}
    </section>
  );
};

export default memo(Hero);
