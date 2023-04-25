import { GetServerSideProps, NextPage } from "next";

import Cards from "@/components/Cards";
import { useFetchSeeMoreOrSearchPageData } from "@/hooks/useFetchSeeMoreOrSearchPageData";
import { homePageService } from "@/modules/home/home.service";
import {
  AppRoutes,
  QueryString,
  SeeMorePageQueryString,
  SliderTitle,
} from "@/types/enums";
import { requestsConfigForSeeMorePage } from "@/utils/requests";
import { prefetchMovieOrSerialData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async () => {
  return prefetchMovieOrSerialData(
    QueryString.moviesForHomePage,
    homePageService.fetchMoviesForHomePage
  );
};

const TrendingMoviesPage: NextPage = () => {
  const {
    fetchNextPage,
    hasNextPage,
    fetchedResults,
    pageTitle,
    dataLength,
    isLoading,
  } = useFetchSeeMoreOrSearchPageData({
    query: SeeMorePageQueryString.TrendingMovies,
    fetcher: (pageParam) =>
      homePageService.fetchSeeMorePageDataForHomePage(
        requestsConfigForSeeMorePage(pageParam).fetchTrendingMovies
      ),
    title: SliderTitle.TrendingMovies,
  });

  return (
    <Cards
      cards={fetchedResults}
      dataLength={dataLength}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage as boolean}
      isLoading={isLoading}
      route={AppRoutes.Home}
      title={pageTitle}
    />
  );
};

export default TrendingMoviesPage;
