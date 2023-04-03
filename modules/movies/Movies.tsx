import React, { FC, useMemo } from "react";

import Hero from "@/components/Hero";
import { AppRoutes, QueryString } from "@/types/enums";
import { getPageSlider } from "@/utils/utils";

import { moviesPageService } from "./movies.service";
import { useFetchMoviesOrSerialsData } from "../../hooks/useFetchMoviesOrSerialsData";

const Movies: FC = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesByGenre,
    fetcher: moviesPageService.fetchMoviesByGenre,
  });

  const moviesPageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({
        data,
        isMoviesPage: true,
        route: AppRoutes.Movies,
      });
    }
  }, [data]);

  return (
    <>
      <Hero data={data?.warMovies?.results ?? []} route={AppRoutes.Movies} />
      {moviesPageSliders}
    </>
  );
};

export default Movies;
