import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

import Cards from "@/components/Cards";
import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { favoritesService } from "@/services/favorites.service";
import { AppRoutes, QueryString } from "@/types/enums";
import { getFavoritesDataBasedOnRoute } from "@/utils/utils";

const FavoritesSerialsPage: NextPage = () => {
  const { data: session } = useSession();

  const { data: favorites, isLoading } = useFetchMoviesOrSerialsData({
    query: QueryString.favoritesMoviesOrSerials,
    fetcher: () =>
      favoritesService.fetchFavoritesMoviesOrSerials(session?.user, "serials"),
  });

  const favoritesDataBasedOnRoute = useMemo(
    () =>
      getFavoritesDataBasedOnRoute(favorites?.data ?? [], AppRoutes.Serials),
    [favorites?.data]
  );

  return (
    <Cards
      cards={favoritesDataBasedOnRoute}
      dataLength={0}
      fetchNextPage={() => null}
      hasNextPage={true}
      isLoading={isLoading}
      route={AppRoutes.Serials}
      title="My list of favorites serials"
    />
  );
};

export default FavoritesSerialsPage;
