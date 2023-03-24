import React, { memo } from "react";

import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { IMAGE_URL } from "@/types/constants";

import HeroContent from "./HeroContent";
import HeroImage from "./HeroImage";

interface HeroProps<T> {
  data: T[];
  isSerialsPage?: boolean;
}

const Hero = <T extends Movie & Serial>({
  data,
  isSerialsPage = false,
}: HeroProps<T>) => {
  const { randomMovieOrSerial } = useGetRandomMovieOrSerial({ data });

  return (
    <section className="relative min-h-screen overflow-x-hidden">
      <div className="relative z-0 h-screen w-full p2 drop-shadow-xl">
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
      />
    </section>
  );
};

export default memo(Hero);
