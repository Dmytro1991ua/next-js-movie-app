import { GetServerSideProps, NextPage } from "next";
import { QueryClient, dehydrate } from "react-query";

import Serials from "@/modules/serials/Serials";
import { serialsPageService } from "@/modules/serials/serials.service";
import { QueryString } from "@/types/enums";

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    QueryString.serials,
    serialsPageService.fetchSerialsData
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

const SerialsPage: NextPage = () => {
  return <Serials />;
};

export default SerialsPage;
