import { useSession } from "next-auth/react";
import { FC, useMemo } from "react";

import Search from "@/components/Search";
import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { MOVIE_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString, SeeMorePageRoutes } from "@/types/enums";
import { getFavoritesDataBasedOnRoute, getPageSlider } from "@/utils/utils";

import Hero from "./../../components/Hero";
import { homePageService } from "./home.service";

const Home: FC = () => {
  const { data: session } = useSession();

  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesForHomePage,
    fetcher: homePageService.fetchMoviesForHomePage,
  });

  const { data: favorites } = useFetchMoviesOrSerialsData({
    query: QueryString.favoritesMoviesOrSerials,
    fetcher: () => homePageService.fetchFavoritesMoviesOrSerials(session?.user),
  });

  const favoritesDataBasedOnRoute = useMemo(
    () => getFavoritesDataBasedOnRoute(favorites?.data ?? [], AppRoutes.Home),
    [favorites?.data]
  );

  const homePageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({
        data: { ...data, favorites: favoritesDataBasedOnRoute },
        isHomePage: true,
        route: AppRoutes.Home,
        hasFavorites: !!favoritesDataBasedOnRoute.length,
        favoritesSeeMoreRoute: SeeMorePageRoutes.FavoritesHomePage,
      });
    }
  }, [data, favoritesDataBasedOnRoute]);

  return (
    <>
      <Hero data={data?.popularMovies?.results ?? []} route={AppRoutes.Home} />
      <Search
        className="mb-14"
        placeholder={MOVIE_SEARCH_INPUT_PLACEHOLDER}
        searchPath={AppRoutes.SearchMovies}
      />
      {homePageSliders}
    </>
  );
};

export default Home;
