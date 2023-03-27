import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesForHomePage";
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

  console.log(data);

  return <div>MovieByGenreDetailsPage</div>;
};

export default MovieByGenreDetailsPage;
