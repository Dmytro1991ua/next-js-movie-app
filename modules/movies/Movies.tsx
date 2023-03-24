import React, { FC } from "react";

import Hero from "@/components/Hero";
import { QueryString } from "@/types/enums";

import { moviesPageService } from "./movies.service";
import { useFetchMoviesOrSerials } from "../../hooks/useFetchMoviesForHomePage";

const Movies: FC = () => {
  const { data } = useFetchMoviesOrSerials({
    query: QueryString.moviesByGenre,
    fetcher: moviesPageService.fetchMoviesByGenre,
  });

  return <Hero data={data?.warMovies?.results ?? []} />;
};

export default Movies;
