import { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";

import Cards from "@/components/Cards";
import { useFetchSeeMorePageData } from "@/hooks/useFetchSeeMorePageData";
import { homePageService } from "@/modules/home/home.service";
import {
  AppRoutes,
  QueryString,
  SeeMorePageQueryString,
  SliderTitle,
} from "@/types/enums";
import { requestsConfigForSeeMorePage } from "@/utils/requests";
import {
  getMoviesOrSerialsPageData,
  getSeeMorePageTitle,
  prefetchMovieOrSerialData,
} from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async () => {
  return prefetchMovieOrSerialData(
    QueryString.moviesForHomePage,
    homePageService.fetchMoviesForHomePage
  );
};

const PopularMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.PopularMovies,
    fetcher: () =>
      homePageService.fetchSeeMorePageDataForHomePage(
        requestsConfigForSeeMorePage().fetchPopularMovies
      ),
  });

  const popularMovies = useMemo(() => getMoviesOrSerialsPageData(data), [data]);
  const pageTitle = useMemo(
    () => getSeeMorePageTitle({ title: SliderTitle.PopularMoviesOrSerials }),
    []
  );

  return (
    <Cards cards={popularMovies} route={AppRoutes.Home} title={pageTitle} />
  );
};

export default PopularMoviesPage;
