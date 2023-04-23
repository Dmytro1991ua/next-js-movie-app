import React, { FC, useMemo } from "react";

import Hero from "@/components/Hero";
import Search from "@/components/Search";
import { useFetchMoviesOrSerialsData } from "@/hooks/useFetchMoviesOrSerialsData";
import { TV_SEARCH_INPUT_PLACEHOLDER } from "@/types/constants";
import { AppRoutes, QueryString } from "@/types/enums";
import { getPageSlider } from "@/utils/utils";

import { serialsPageService } from "./serials.service";

const Serials: FC = () => {
  const { data } = useFetchMoviesOrSerialsData({
    query: QueryString.serials,
    fetcher: serialsPageService.fetchSerialsData,
  });

  const serialsPageSliders = useMemo(() => {
    if (data) {
      return getPageSlider({
        data,
        isSerialsPage: true,
        route: AppRoutes.Serials,
      });
    }
  }, [data]);

  return (
    <>
      <Hero
        isSerialsPage
        data={data?.topRatedSerials?.results ?? []}
        route={AppRoutes.Serials}
      />
      <Search
        className="mb-14"
        placeholder={TV_SEARCH_INPUT_PLACEHOLDER}
        searchPath={AppRoutes.SearchSerials}
      />
      {serialsPageSliders}
    </>
  );
};

export default Serials;
