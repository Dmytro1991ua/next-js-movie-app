import { GetServerSideProps, NextPage } from "next";

import DetailsPage from "@/components/DetailsPage";
import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesOrSerialsData";
import { serialsPageService } from "@/modules/serials/serials.service";
import { TV_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString } from "@/types/enums";
import { prefetchMovieOrSerialDetailsData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serialId } = context.query;

  return prefetchMovieOrSerialDetailsData({
    id: serialId as string,
    queryString: QueryString.serialDetails,
    fetcher: () => serialsPageService.fetchSerialDetailsData(serialId),
  });
};

const SerialDetailsPage: NextPage = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.serialDetails,
    fetcher: () => serialsPageService.fetchSerialDetailsData(),
  });

  return (
    <DetailsPage
      movieOrSerialCast={data?.movieOrSerialActors}
      movieOrSerialDetails={data?.movieOrSerialDetails}
      placeholder={TV_SEARCH_INPUT_PLACEHOLDER}
      searchPath={AppRoutes.SearchSerials}
    />
  );
};

export default SerialDetailsPage;
