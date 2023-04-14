import { GetServerSideProps, NextPage } from "next";

import Serials from "@/modules/serials/Serials";
import { serialsPageService } from "@/modules/serials/serials.service";
import { QueryString } from "@/types/enums";
import { prefetchMovieOrSerialData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async () => {
  return prefetchMovieOrSerialData(
    QueryString.serials,
    serialsPageService.fetchSerialsData
  );
};

const SerialsPage: NextPage = () => {
  return <Serials />;
};

export default SerialsPage;
