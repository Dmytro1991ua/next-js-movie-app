import { FC, useMemo } from "react";

import Search from "@/components/Search/Search";
import { MOVIE_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString } from "@/types/enums";
import { getPageSlider } from "@/utils/utils";

import Hero from "./../../components/Hero";
import { homePageService } from "./home.service";
import { useFetchMoviesOrSerialsData } from "../../hooks/useFetchMoviesOrSerialsData";

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
      <Hero data={data?.popularMovies?.results ?? []} route={AppRoutes.Home} />
      <Search
        className="mb-14"
        placeholder={MOVIE_SEARCH_INPUT_PLACEHOLDER}
        searchPath={AppRoutes.SearchMovies}
      />
      {homePageSliders}
    </>
  );
};

export default Home;
