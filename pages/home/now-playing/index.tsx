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

const NowPlayingMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.NowPlayingMovies,
    fetcher: () =>
      homePageService.fetchSeeMorePageDataForHomePage(
        requestsConfigForSeeMorePage().fetchNowPlayingMovies
      ),
  });

  console.log("Now Playing", { data });

  return <div>NowPlayingPage</div>;
};

export default NowPlayingMoviesPage;
