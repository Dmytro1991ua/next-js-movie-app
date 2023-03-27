import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesForHomePage";
import { homePageService } from "@/modules/home/home.service";
import { QueryString } from "@/types/enums";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { movieId } = context.query;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(QueryString.moviesForHomePageDetails, () =>
    homePageService.fetchMoviesDetailsData(movieId)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const MovieDetailsPage: NextPage = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesForHomePageDetails,
    fetcher: () => homePageService.fetchMoviesDetailsData(),
  });

  console.log(data);

  return <div>MovieDetailsPage</div>;
};

export default MovieDetailsPage;
