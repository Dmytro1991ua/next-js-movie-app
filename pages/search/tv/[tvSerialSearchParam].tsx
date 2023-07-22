import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import Cards from "@/components/Cards";
import { useFetchSeeMoreOrSearchPageData } from "@/hooks/queries/useFetchSeeMoreOrSearchPageData";
import { searchService } from "@/services/search.service";
import { AppRoutes, QueryString } from "@/types/enums";
import { prefetchMoviesOrSerialsForSearchPage } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tvSerialSearchParam } = context.query;

  return prefetchMoviesOrSerialsForSearchPage({
    searchPath: AppRoutes.SearchSerials,
    searchParam: tvSerialSearchParam as string,
    queryString: QueryString.tvSerialsForSearchPage,
    fetcher: () =>
      searchService.fetchDataForSearchPage({
        searchPath: AppRoutes.SearchSerials,
        searchParam: tvSerialSearchParam as string,
      }),
  });
};

const SearchTVSerialPage: NextPage = () => {
  const {
    query: { tvSerialSearchParam },
  } = useRouter();

  const {
    fetchNextPage,
    hasNextPage,
    fetchedResults,
    pageTitle,
    dataLength,
    isLoading,
  } = useFetchSeeMoreOrSearchPageData({
    query: QueryString.tvSerialsForSearchPage,
    fetcher: (pageParam) =>
      searchService.fetchDataForSearchPage({
        searchPath: AppRoutes.SearchSerials,
        searchParam: tvSerialSearchParam as string,
        pageParam,
      }),
    searchParam: tvSerialSearchParam as string,
    isSearchResultsPage: true,
  });

  return (
    <Cards
      cards={fetchedResults}
      dataLength={dataLength}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage as boolean}
      isLoading={isLoading}
      route={AppRoutes.Serials}
      title={pageTitle}
    />
  );
};

export default SearchTVSerialPage;
