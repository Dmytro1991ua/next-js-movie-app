import { useSession } from "next-auth/react";
import React, { FC, useMemo } from "react";

import Hero from "@/components/Hero";
import Search from "@/components/Search";
import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { MOVIE_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString } from "@/types/enums";
import { getFavoritesDataBasedOnRoute, getPageSlider } from "@/utils/utils";

import { moviesPageService } from "./movies.service";
import { homePageService } from "../home/home.service";

const Movies: FC = () => {
  const { data: session } = useSession();

  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesByGenre,
    fetcher: moviesPageService.fetchMoviesByGenre,
  });

  const { data: favorites } = useFetchMoviesOrSerialsData({
    query: QueryString.favoritesMoviesOrSerials,
    fetcher: () => homePageService.fetchFavoritesMoviesOrSerials(session?.user),
  });

  const favoritesDataBasedOnRoute = useMemo(
    () => getFavoritesDataBasedOnRoute(favorites?.data ?? [], AppRoutes.Movies),
    [favorites?.data]
  );

  const moviesPageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({
        data: { ...data, favorites: favoritesDataBasedOnRoute },
        isMoviesPage: true,
        route: AppRoutes.Movies,
        hasFavorites: !!favoritesDataBasedOnRoute.length,
      });
    }
  }, [data, favoritesDataBasedOnRoute]);

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
