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

const PopularSerialsPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.PopularSerials,
    fetcher: () =>
      serialsPageService.fetchSeeMorePageDataForSerialsPage(
        requestsConfigForSeeMorePage().fetchPopularSerials
      ),
  });

  const popularSerials = useMemo(
    () => getMoviesOrSerialsPageData(data),
    [data]
  );
  const pageTitle = useMemo(
    () =>
      getSeeMorePageTitle({
        title: SliderTitle.PopularMoviesOrSerials,
        isMovie: false,
      }),
    []
  );

  return (
    <Cards cards={popularSerials} route={AppRoutes.Serials} title={pageTitle} />
  );
};

export default PopularSerialsPage;