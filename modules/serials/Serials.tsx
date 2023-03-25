import React, { FC, useMemo } from "react";

import Hero from "@/components/Hero";
import { useFetchMoviesOrSerials } from "@/hooks/useFetchMoviesForHomePage";
import { QueryString } from "@/types/enums";
import { getPageSlider } from "@/utils/utils";

import { serialsPageService } from "./serials.service";

const Serials: FC = () => {
  const { data } = useFetchMoviesOrSerials({
    query: QueryString.serials,
    fetcher: serialsPageService.fetchSerialsData,
  });

  const serialsPageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({ data, isSerialsPage: true });
    }
  }, [data]);

  return (
    <>
      <Hero isSerialsPage data={data?.topRatedSerials?.results ?? []} />
      {serialsPageSliders}
    </>
  );
};

export default Serials;
