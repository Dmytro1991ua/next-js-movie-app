import React, { FC } from "react";

import Hero from "@/components/Hero";
import { useFetchMoviesOrSerials } from "@/hooks/useFetchMoviesForHomePage";
import { QueryString } from "@/types/enums";

import { serialsPageService } from "./serials.service";

const Serials: FC = () => {
  const { data } = useFetchMoviesOrSerials({
    query: QueryString.serials,
    fetcher: serialsPageService.fetchSerialsData,
  });

  return <Hero isSerialsPage data={data?.topRatedSerials?.results ?? []} />;
};

export default Serials;
