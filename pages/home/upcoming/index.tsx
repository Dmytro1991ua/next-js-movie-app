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

const UpcomingMoviesPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.UpcomingMovies,
    fetcher: () =>
      homePageService.fetchSeeMorePageDataForHomePage(
        requestsConfigForSeeMorePage().fetchUpcomingMovies
      ),
  });

  console.log("Upcoming", { data });

  return <div>UpcomingMoviesPage</div>;
};

export default UpcomingMoviesPage;
