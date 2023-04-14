import { GetServerSideProps, NextPage } from "next";

import Movies from "@/modules/movies";
import { moviesPageService } from "@/modules/movies/movies.service";
import { QueryString } from "@/types/enums";
import { prefetchMovieOrSerialData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async () => {
  return prefetchMovieOrSerialData(
    QueryString.moviesByGenre,
    moviesPageService.fetchMoviesByGenre
  );
};

const MoviesPage: NextPage = () => {
  return <Movies />;
};

export default MoviesPage;
