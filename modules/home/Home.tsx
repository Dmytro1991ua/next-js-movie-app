import { FC, useMemo } from "react";

import { QueryString } from "@/types/enums";
import { getPageSlider } from "@/utils/utils";

import Hero from "./../../components/Hero";
import { homePageService } from "./home.service";
import { useFetchMoviesOrSerials } from "../../hooks/useFetchMoviesForHomePage";

const Home: FC = () => {
  const { data } = useFetchMoviesOrSerials({
    query: QueryString.moviesForHomePage,
    fetcher: homePageService.fetchMoviesForHomePage,
  });

  const homePageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({ data, isHomePage: true });
    }
  }, [data]);

  return (
    <>
      <Hero data={data?.popularMovies?.results ?? []} />
      {homePageSliders}
    </>
  );
};

export default Home;
