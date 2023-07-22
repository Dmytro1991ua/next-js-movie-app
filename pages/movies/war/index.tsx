import { GetServerSideProps, NextPage } from "next";

import Cards from "@/components/Cards";
import { useFetchSeeMoreOrSearchPageData } from "@/hooks/queries/useFetchSeeMoreOrSearchPageData";
import { moviesPageService } from "@/modules/movies/movies.service";
import { mediaSeeMorePageService } from "@/services/mediaSeeMorePage.service";
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
    QueryString.moviesByGenre,
    moviesPageService.fetchMoviesByGenre
  );
};

const WarMoviesPage: NextPage = () => {
  const {
    fetchNextPage,
    hasNextPage,
    fetchedResults,
    pageTitle,
    dataLength,
    isLoading,
  } = useFetchSeeMoreOrSearchPageData({
    query: SeeMorePageQueryString.WarMovies,
    fetcher: (pageParam) =>
      mediaSeeMorePageService.fetchSeeMorePageData(
        requestsConfigForSeeMorePage(pageParam).fetchWarMovies
      ),
    title: SliderTitle.WarMovies,
  });

  return (
    <Cards
      cards={fetchedResults}
      dataLength={dataLength}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage as boolean}
      isLoading={isLoading}
      route={AppRoutes.Movies}
      title={pageTitle}
    />
  );
};

export default WarMoviesPage;
