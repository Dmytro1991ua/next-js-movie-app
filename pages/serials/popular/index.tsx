import { GetServerSideProps, NextPage } from "next";

import Cards from "@/components/Cards";
import { useFetchSeeMoreOrSearchPageData } from "@/hooks/queries/useFetchSeeMoreOrSearchPageData";
import { serialsPageService } from "@/modules/serials/serials.service";
import { mediaSeeMorePageService } from "@/services/mediaSeeMorePage.service";
import {
  AppRoutes,
  QueryString,
  SeeMorePageQueryString,
  SliderTitle,
} from "@/types/enums";
import { requestsConfigForSeeMorePage } from "@/utils/requests";
import { prefetchMovieOrSerialData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async () => {
  return prefetchMovieOrSerialData(
    QueryString.serials,
    serialsPageService.fetchSerialsData
  );
};

const PopularSerialsPage: NextPage = () => {
  const {
    fetchNextPage,
    hasNextPage,
    fetchedResults,
    pageTitle,
    dataLength,
    isLoading,
  } = useFetchSeeMoreOrSearchPageData({
    query: SeeMorePageQueryString.PopularSerials,
    fetcher: (pageParam) =>
      mediaSeeMorePageService.fetchSeeMorePageData(
        requestsConfigForSeeMorePage(pageParam).fetchPopularSerials,
        "serials"
      ),
    title: SliderTitle.PopularMoviesOrSerials,
    isMovie: false,
  });

  return (
    <Cards
      cards={fetchedResults}
      dataLength={dataLength}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage as boolean}
      isLoading={isLoading}
      route={AppRoutes.Serials}
      title={pageTitle}
    />
  );
};

export default PopularSerialsPage;
