import { GetServerSideProps, NextPage } from "next";

import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import { mediaDetailsService } from "@/services/mediaDetails.service";
import { MOVIE_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString } from "@/types/enums";
import { prefetchMovieOrSerialDetailsData } from "@/utils/utils";

import DetailsPage from "../../../components/DetailsPage";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { movieId } = context.query;

  return prefetchMovieOrSerialDetailsData({
    id: movieId as string,
    queryString: QueryString.moviesForHomePageDetails,
    fetcher: () =>
      mediaDetailsService.fetchMediaDetailsData({
        id: movieId,
        contentType: "movie",
      }),
  });
};

const MovieDetailsPage: NextPage = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesForHomePageDetails,
    fetcher: () => mediaDetailsService.fetchMediaDetailsData({}),
  });

  return (
    <DetailsPage
      movieOrSerialCast={data?.movieOrSerialActors as Cast}
      movieOrSerialDetails={data?.movieOrSerialDetails as MovieOrSerialDetail}
      placeholder={MOVIE_SEARCH_INPUT_PLACEHOLDER}
      searchPath={AppRoutes.SearchMovies}
    />
  );
};

export default MovieDetailsPage;
