import { GetServerSideProps, NextPage } from "next";

import Home from "@/modules/home";
import { homePageService } from "@/modules/home/home.service";
import { QueryString } from "@/types/enums";
import { prefetchMovieOrSerialData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async () => {
  return prefetchMovieOrSerialData(
    QueryString.moviesForHomePage,
    homePageService.fetchMoviesForHomePage
  );
};

const HomePage: NextPage = () => {
  return <Home />;
};

export default HomePage;
