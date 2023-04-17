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

const HorrorMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.HorrorMovies,
    fetcher: () =>
      moviesPageService.fetchSeeMorePageDataForMoviesPage(
        requestsConfigForSeeMorePage().fetchHorrorMovies
      ),
  });

  const horrorMovies = useMemo(() => getMoviesOrSerialsPageData(data), [data]);
  const pageTitle = useMemo(
    () => getSeeMorePageTitle({ title: SliderTitle.HorrorMovies }),
    []
  );

  return (
    <Cards cards={horrorMovies} route={AppRoutes.Movies} title={pageTitle} />
  );
};

export default HorrorMoviesPage;
