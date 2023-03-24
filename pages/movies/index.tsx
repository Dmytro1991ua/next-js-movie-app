import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import Movies from "@/modules/movies";
import { moviesPageService } from "@/modules/movies/movies.service";
import { QueryString } from "@/types/enums";

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    QueryString.moviesByGenre,
    moviesPageService.fetchMoviesByGenre
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const MoviesPage: NextPage = () => {
  return <Movies />;
};

export default MoviesPage;
