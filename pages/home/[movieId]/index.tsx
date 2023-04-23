import { GetServerSideProps, NextPage } from "next";

import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesOrSerialsData";
import { homePageService } from "@/modules/home/home.service";
import { MOVIE_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString } from "@/types/enums";
import { prefetchMovieOrSerialDetailsData } from "@/utils/utils";

import DetailsPage from "../../../components/DetailsPage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { movieId } = context.query;

  return prefetchMovieOrSerialDetailsData({
    id: movieId as string,
    queryString: QueryString.moviesForHomePageDetails,
    fetcher: () => homePageService.fetchMoviesDetailsData(movieId),
  });
};

const MovieDetailsPage: NextPage = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesForHomePageDetails,
    fetcher: () => homePageService.fetchMoviesDetailsData(),
  });

  return (
    <DetailsPage
      movieOrSerialCast={data?.movieOrSerialActors}
      movieOrSerialDetails={data?.movieOrSerialDetails}
      placeholder={MOVIE_SEARCH_INPUT_PLACEHOLDER}
      searchPath={AppRoutes.SearchMovies}
    />
  );
};

export default MovieDetailsPage;
