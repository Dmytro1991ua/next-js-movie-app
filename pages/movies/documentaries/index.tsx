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

const DocumentariesMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.Documentaries,
    fetcher: () =>
      moviesPageService.fetchSeeMorePageDataForMoviesPage(
        requestsConfigForSeeMorePage().fetchDocumentariesMovies
      ),
  });

  const documentariesMovies = useMemo(
    () => getMoviesOrSerialsPageData(data),
    [data]
  );
  const pageTitle = useMemo(
    () => getSeeMorePageTitle({ title: SliderTitle.Documentaries }),
    []
  );

  return (
    <Cards
      cards={documentariesMovies}
      route={AppRoutes.Movies}
      title={pageTitle}
    />
  );
};

export default DocumentariesMoviesPage;
