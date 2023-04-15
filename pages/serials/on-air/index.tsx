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

const OnAirSerialsPage: NextPage = () => {
  const { data } = useFetchSeeMorePageData({
    query: SeeMorePageQueryString.SerialsOnAir,
    fetcher: () =>
      serialsPageService.fetchSeeMorePageDataForSerialsPage(
        requestsConfigForSeeMorePage().fetchSerialsOnAir
      ),
  });

  console.log("On Air Serials", { data });

  return <div>OnAirSerialsPage</div>;
};

export default OnAirSerialsPage;
