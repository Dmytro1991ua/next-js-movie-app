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

const AiringTodaySerialsPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.SerialsAiringToday,
    fetcher: () =>
      serialsPageService.fetchSeeMorePageDataForSerialsPage(
        requestsConfigForSeeMorePage().fetchSerialsAiringToday
      ),
  });

  console.log("Airing today Serials", { data });

  return <div>AiringTodaySerialsPage</div>;
};

export default AiringTodaySerialsPage;
