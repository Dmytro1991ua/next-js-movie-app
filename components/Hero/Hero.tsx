import React, { memo } from "react";

import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { IMAGE_URL } from "@/types/constants";
import { AppRoutes } from "@/types/enums";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";
import { useHeroState } from "./hooks/useHeroState";
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
  const {
    initialRatingValue,
    isTrailerShown,
    randomMovieOrSerial,
    newRatingData,
    onHandleRedirectToDetailsPage,
    onTrailerClosing,
    onTrailerOpening,
    trailerUrl,
  } = useHeroState({ data, route });

  return (
    <section className="relative min-h-screen overflow-x-hidden">
      <div className="hero-image-wrapper">
        <HeroImage
          imgUrl={`${IMAGE_URL}${randomMovieOrSerial?.backdrop_path}`}
        />
      </div>
      <HeroContent
        initialRatingValue={initialRatingValue}
        newRatingData={newRatingData}
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
