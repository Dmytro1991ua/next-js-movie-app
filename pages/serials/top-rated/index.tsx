import { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";

import Cards from "@/components/Cards";
import { useFetchSeeMorePageData } from "@/hooks/useFetchSeeMorePageData";
import { serialsPageService } from "@/modules/serials/serials.service";
import {
  AppRoutes,
  QueryString,
  SeeMorePageQueryString,
  SliderTitle,
} from "@/types/enums";
import { requestsConfigForSeeMorePage } from "@/utils/requests";
import {
  getMoviesOrSerialsPageData,
  getSeeMorePageTitle,
  prefetchMovieOrSerialData,
} from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async () => {
  return prefetchMovieOrSerialData(
    QueryString.serials,
    serialsPageService.fetchSerialsData
  );
};

const TopRatedSerialsPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.TopRatedSerials,
    fetcher: () =>
      serialsPageService.fetchSeeMorePageDataForSerialsPage(
        requestsConfigForSeeMorePage().fetchTopRatedSerials
      ),
  });

  const topRatedSerials = useMemo(
    () => getMoviesOrSerialsPageData(data),
    [data]
  );
  const pageTitle = useMemo(
    () =>
      getSeeMorePageTitle({
        title: SliderTitle.TopRatedMoviesOrSerials,
        isMovie: false,
      }),
    []
  );

  return (
    <Cards
      cards={topRatedSerials}
      route={AppRoutes.Serials}
      title={pageTitle}
    />
  );
};

export default TopRatedSerialsPage;
