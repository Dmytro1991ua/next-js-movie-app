import { GetServerSideProps, NextPage } from "next";

import DetailsPage from "@/components/DetailsPage";
import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesOrSerialsData";
import { moviesPageService } from "@/modules/movies/movies.service";
import { QueryString } from "@/types/enums";
import { prefetchMovieOrSerialDetailsData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { movieByGenreId } = context.query;

  return prefetchMovieOrSerialDetailsData({
    id: movieByGenreId as string,
    queryString: QueryString.moviesByGenreDetails,
    fetcher: () =>
      moviesPageService.fetchMoviesByGenreDetailsData(movieByGenreId),
  });
};

const MovieByGenreDetailsPage: NextPage = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesByGenreDetails,
    fetcher: () => moviesPageService.fetchMoviesByGenreDetailsData(),
  });

  return (
    <DetailsPage
      movieOrSerialCast={data?.movieOrSerialActors}
      movieOrSerialDetails={data?.movieOrSerialDetails}
    />
  );
};

export default MovieByGenreDetailsPage;
