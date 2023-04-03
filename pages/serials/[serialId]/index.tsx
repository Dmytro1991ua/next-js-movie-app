import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import DetailsPage from "@/components/DetailsPage";
import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesOrSerialsData";
import { serialsPageService } from "@/modules/serials/serials.service";
import { QueryString } from "@/types/enums";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serialId } = context.query;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(QueryString.serialDetails, () =>
    serialsPageService.fetchSerialDetailsData(serialId)
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
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
