import { GetServerSideProps, NextPage } from "next";

import { useFetchSeeMorePageData } from "@/hooks/useFetchSeeMorePageData";
import { homePageService } from "@/modules/home/home.service";
import { QueryString, SeeMorePageQueryString } from "@/types/enums";
import { requestsConfigForSeeMorePage } from "@/utils/requests";
import { prefetchMovieOrSerialData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async () => {
  return prefetchMovieOrSerialData(
    QueryString.moviesForHomePage,
    homePageService.fetchMoviesForHomePage
  );
};

const TrendingMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.TrendingMovies,
    fetcher: () =>
      homePageService.fetchSeeMorePageDataForHomePage(
        requestsConfigForSeeMorePage().fetchTrendingMovies
      ),
  });

  console.log("Trending", { data });

  return <div>TrendingMoviesPage</div>;
};

export default TrendingMoviesPage;
