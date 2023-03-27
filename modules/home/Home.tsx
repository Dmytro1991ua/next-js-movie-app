import { FC, useMemo } from "react";

import { AppRoutes, QueryString } from "@/types/enums";
import { getPageSlider } from "@/utils/utils";

import Hero from "./../../components/Hero";
import { homePageService } from "./home.service";
import { useFetchMoviesOrSerialsData } from "../../hooks/useFetchMoviesForHomePage";

const Home: FC = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.moviesForHomePage,
    fetcher: homePageService.fetchMoviesForHomePage,
  });

  const homePageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({ data, isHomePage: true, route: AppRoutes.Home });
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
