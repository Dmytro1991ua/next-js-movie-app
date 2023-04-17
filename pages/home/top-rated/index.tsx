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

const TopRatedMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.TopRatedMovies,
    fetcher: () =>
      homePageService.fetchSeeMorePageDataForHomePage(
        requestsConfigForSeeMorePage().fetchTopRatedMovies
      ),
  });

  const topRatedMovies = useMemo(
    () => getMoviesOrSerialsPageData(data),
    [data]
  );
  const pageTitle = useMemo(
    () => getSeeMorePageTitle({ title: SliderTitle.TopRatedMoviesOrSerials }),
    []
  );

  return (
    <Cards cards={topRatedMovies} route={AppRoutes.Home} title={pageTitle} />
  );
};

export default TopRatedMoviesPage;
