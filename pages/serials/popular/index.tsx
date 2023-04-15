import { GetServerSideProps, NextPage } from "next";

import { useFetchSeeMorePageData } from "@/hooks/useFetchSeeMorePageData";
import { serialsPageService } from "@/modules/serials/serials.service";
import { QueryString, SeeMorePageQueryString } from "@/types/enums";
import { requestsConfigForSeeMorePage } from "@/utils/requests";
import { prefetchMovieOrSerialData } from "@/utils/utils";

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

  console.log("Popular Serials", { data });

  return <div>PopularSerialsPage</div>;
};

export default PopularSerialsPage;
