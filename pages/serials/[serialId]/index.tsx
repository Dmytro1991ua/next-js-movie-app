import { GetServerSideProps, NextPage } from "next";

import DetailsPage from "@/components/DetailsPage";
import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesOrSerialsData";
import { serialsPageService } from "@/modules/serials/serials.service";
import { QueryString } from "@/types/enums";
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
    />
  );
};

export default SerialDetailsPage;
