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

const TopRatedSerialsPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.TopRatedSerials,
    fetcher: () =>
      serialsPageService.fetchSeeMorePageDataForSerialsPage(
        requestsConfigForSeeMorePage().fetchTopRatedSerials
      ),
  });

  console.log("Top Rated Serials", { data });

  return <div>TopRatedSerialsPage</div>;
};

export default TopRatedSerialsPage;
