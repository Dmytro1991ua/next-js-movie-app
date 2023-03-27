import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesForHomePage";
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

  console.log(data);

  return <div>SerialDetailsPage</div>;
};

export default SerialDetailsPage;
