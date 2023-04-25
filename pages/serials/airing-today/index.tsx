import { GetServerSideProps, NextPage } from "next";

import Cards from "@/components/Cards";
import { useFetchSeeMoreOrSearchPageData } from "@/hooks/useFetchSeeMoreOrSearchPageData";
import { serialsPageService } from "@/modules/serials/serials.service";
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

const AiringTodaySerialsPage: NextPage = () => {
  const {
    fetchNextPage,
    hasNextPage,
    fetchedResults,
    pageTitle,
    dataLength,
    isLoading,
  } = useFetchSeeMoreOrSearchPageData({
    query: SeeMorePageQueryString.SerialsAiringToday,
    fetcher: (pageParam) =>
      serialsPageService.fetchSeeMorePageDataForSerialsPage(
        requestsConfigForSeeMorePage(pageParam).fetchSerialsAiringToday
      ),
    title: SliderTitle.SerialsAiringToday,
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

export default AiringTodaySerialsPage;
