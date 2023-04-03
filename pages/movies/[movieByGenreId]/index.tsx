import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import DetailsPage from "@/components/DetailsPage";
import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesOrSerialsData";
import { moviesPageService } from "@/modules/movies/movies.service";
import { QueryString } from "@/types/enums";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { movieByGenreId } = context.query;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(QueryString.moviesByGenreDetails, () =>
    moviesPageService.fetchMoviesByGenreDetailsData(movieByGenreId)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
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
