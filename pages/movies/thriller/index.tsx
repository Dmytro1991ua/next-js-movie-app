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

const ThrillerMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.ThrillerMovies,
    fetcher: () =>
      moviesPageService.fetchSeeMorePageDataForMoviesPage(
        requestsConfigForSeeMorePage().fetchThrillerMovies
      ),
  });

  console.log("Thriller Movies", { data });

  return <div>ThrillerMoviesPage</div>;
};

export default ThrillerMoviesPage;
