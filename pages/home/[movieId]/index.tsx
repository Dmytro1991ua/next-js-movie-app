import { GetServerSideProps, NextPage } from "next";

import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesOrSerialsData";
import { homePageService } from "@/modules/home/home.service";
import { QueryString } from "@/types/enums";
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
    />
  );
};

export default MovieDetailsPage;
