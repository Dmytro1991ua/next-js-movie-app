import React, { FC, useMemo } from "react";

import Hero from "@/components/Hero";
import { QueryString } from "@/types/enums";
import { getPageSlider } from "@/utils/utils";

import { moviesPageService } from "./movies.service";
import { useFetchMoviesOrSerials } from "../../hooks/useFetchMoviesForHomePage";

const Movies: FC = () => {
  const { data } = useFetchMoviesOrSerials({
    query: QueryString.moviesByGenre,
    fetcher: moviesPageService.fetchMoviesByGenre,
  });

  const moviesPageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({ data, isMoviesPage: true });
    }
  }, [data]);

  return (
    <>
      <Hero data={data?.warMovies?.results ?? []} />
      {moviesPageSliders}
    </>
  );
};

export default Movies;
