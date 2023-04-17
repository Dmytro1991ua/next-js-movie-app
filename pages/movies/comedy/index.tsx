import { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";

import Cards from "@/components/Cards";
import { useFetchSeeMorePageData } from "@/hooks/useFetchSeeMorePageData";
import { moviesPageService } from "@/modules/movies/movies.service";
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
    QueryString.moviesByGenre,
    moviesPageService.fetchMoviesByGenre
  );
};

const ComedyMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.ComedyMovies,
    fetcher: () =>
      moviesPageService.fetchSeeMorePageDataForMoviesPage(
        requestsConfigForSeeMorePage().fetchComedyMovies
      ),
  });

  const comedyMovies = useMemo(() => getMoviesOrSerialsPageData(data), [data]);
  const pageTitle = useMemo(
    () => getSeeMorePageTitle({ title: SliderTitle.ComedyMovies }),
    []
  );

  return (
    <Cards cards={comedyMovies} route={AppRoutes.Movies} title={pageTitle} />
  );
};

export default ComedyMoviesPage;
