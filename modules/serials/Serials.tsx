import { useSession } from "next-auth/react";
import React, { FC, useMemo } from "react";

import Hero from "@/components/Hero";
import Search from "@/components/Search";
import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { favoritesService } from "@/services/favorites.service";
import { TV_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString, SeeMorePageRoutes } from "@/types/enums";
import { getFavoritesDataBasedOnRoute, getPageSlider } from "@/utils/utils";

import { serialsPageService } from "./serials.service";

const Serials: FC = () => {
  const { data: session } = useSession();

  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.serials,
    fetcher: serialsPageService.fetchSerialsData,
  });

  const { data: favorites } = useFetchMoviesOrSerialsData({
    query: QueryString.favoritesMoviesOrSerials,
    fetcher: () =>
      favoritesService.fetchFavoritesMoviesOrSerials(session?.user),
  });

  const favoritesDataBasedOnRoute = useMemo(
    () =>
      getFavoritesDataBasedOnRoute(favorites?.data ?? [], AppRoutes.Serials),
    [favorites?.data]
  );

  const serialsPageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({
        data: { ...data, favorites: favoritesDataBasedOnRoute },
        isSerialsPage: true,
        route: AppRoutes.Serials,
        hasFavorites: !!favoritesDataBasedOnRoute.length,
        favoritesSeeMoreRoute: SeeMorePageRoutes.FavoritesSerialsPage,
      });
    }
  }, [data, favoritesDataBasedOnRoute]);

  return (
    <>
      <Hero
        isSerialsPage
        data={data?.topRatedSerials?.results ?? []}
        route={AppRoutes.Serials}
      />
      <Search
        className="mb-14"
        placeholder={TV_SEARCH_INPUT_PLACEHOLDER}
        searchPath={AppRoutes.SearchSerials}
      />
      {serialsPageSliders}
    </>
  );
};

export default Serials;
