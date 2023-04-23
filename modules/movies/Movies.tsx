import React, { FC, useMemo } from "react";

import Hero from "@/components/Hero";
import Search from "@/components/Search";
import { MOVIE_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
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
      <Search
        className="mb-14"
        placeholder={MOVIE_SEARCH_INPUT_PLACEHOLDER}
        searchPath={AppRoutes.SearchMovies}
      />
      {moviesPageSliders}
    </>
  );
};

export default Movies;
