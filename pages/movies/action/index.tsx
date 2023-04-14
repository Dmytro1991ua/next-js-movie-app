import { GetServerSideProps, NextPage } from "next";

import { useFetchSeeMorePageData } from "@/hooks/useFetchSeeMorePageData";
import { moviesPageService } from "@/modules/movies/movies.service";
import { QueryString, SeeMorePageQueryString } from "@/types/enums";
import { requestsConfigForSeeMorePage } from "@/utils/requests";
import { prefetchMovieOrSerialData } from "@/utils/utils";

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

  console.log("Action Movies", { data });

  return <div>ActionMoviesPage</div>;
};

export default ActionMoviesPage;
