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

const ActionMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.ActionMovies,
    fetcher: () =>
      moviesPageService.fetchSeeMorePageDataForMoviesPage(
        requestsConfigForSeeMorePage().fetchActionMovies
      ),
  });

  const actionMovies = useMemo(() => getMoviesOrSerialsPageData(data), [data]);
  const pageTitle = useMemo(
    () => getSeeMorePageTitle({ title: SliderTitle.ActionMovies }),
    []
  );

  return (
    <Cards cards={actionMovies} route={AppRoutes.Movies} title={pageTitle} />
  );
};

export default ActionMoviesPage;
