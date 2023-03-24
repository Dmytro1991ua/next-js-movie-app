import { FC } from "react";

import { QueryString } from "@/types/enums";

import Hero from "./../../components/Hero";
import { homePageService } from "./home.service";
import { useFetchMoviesOrSerials } from "../../hooks/useFetchMoviesForHomePage";

const Home: FC = () => {
  const { data } = useFetchMoviesOrSerials({
    query: QueryString.moviesForHomePage,
    fetcher: homePageService.fetchMoviesForHomePage,
  });

  return <Hero data={data?.popularMovies?.results ?? []} />;
};

export default Home;
