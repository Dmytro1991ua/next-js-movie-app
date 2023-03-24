import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import Home from "@/modules/home";
import { homePageService } from "@/modules/home/home.service";
import { QueryString } from "@/types/enums";

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    QueryString.moviesForHomePage,
    homePageService.fetchMoviesForHomePage
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;
