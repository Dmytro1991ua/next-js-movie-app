import { GetServerSideProps, NextPage } from "next";

import DetailsPage from "@/components/DetailsPage";
import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import { mediaDetailsService } from "@/services/mediaDetails.service";
import { TV_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString } from "@/types/enums";
import { prefetchMovieOrSerialDetailsData } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { serialId } = context.query;

  return prefetchMovieOrSerialDetailsData({
    id: serialId as string,
    queryString: QueryString.serialDetails,
    fetcher: () =>
      mediaDetailsService.fetchMediaDetailsData({
        id: serialId,
        mediaType: "serials",
        contentType: "tv",
      }),
  });
};

const SerialDetailsPage: NextPage = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.serialDetails,
    fetcher: () => mediaDetailsService.fetchMediaDetailsData({}),
  });

  return (
    <DetailsPage
      movieOrSerialCast={data?.movieOrSerialActors as Cast}
      movieOrSerialDetails={data?.movieOrSerialDetails as MovieOrSerialDetail}
      placeholder={TV_SEARCH_INPUT_PLACEHOLDER}
      searchPath={AppRoutes.SearchSerials}
    />
  );
};

export default SerialDetailsPage;
