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

const ComedyMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.ComedyMovies,
    fetcher: () =>
      moviesPageService.fetchSeeMorePageDataForMoviesPage(
        requestsConfigForSeeMorePage().fetchComedyMovies
      ),
  });

  console.log("Comedy Movies", { data });

  return <div>ComedyMoviesPage</div>;
};

export default ComedyMoviesPage;
