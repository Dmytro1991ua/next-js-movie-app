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

const TopRatedMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.TopRatedMovies,
    fetcher: () =>
      homePageService.fetchSeeMorePageDataForHomePage(
        requestsConfigForSeeMorePage().fetchTopRatedMovies
      ),
  });

  console.log("Top Rated", { data });

  return <div>TopRatedMoviesPage</div>;
};

export default TopRatedMoviesPage;
