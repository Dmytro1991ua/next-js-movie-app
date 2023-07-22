import { GetServerSideProps, NextPage } from "next";

import DetailsPage from "@/components/DetailsPage";
import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import { mediaDetailsService } from "@/services/mediaDetails.service";
import { MOVIE_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString } from "@/types/enums";
import { prefetchMovieOrSerialDetailsData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { movieByGenreId } = context.query;

  return prefetchMovieOrSerialDetailsData({
    id: movieByGenreId as string,
    queryString: QueryString.moviesByGenreDetails,
    fetcher: () =>
      mediaDetailsService.fetchMediaDetailsData({
        id: movieByGenreId,
        contentType: "movie",
      }),
  });
};

const MovieByGenreDetailsPage: NextPage = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesByGenreDetails,
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

export default MovieByGenreDetailsPage;
