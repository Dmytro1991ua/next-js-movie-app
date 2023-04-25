import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";

import Cards from "@/components/Cards";
import { useFetchSeeMoreOrSearchPageData } from "@/hooks/useFetchSeeMoreOrSearchPageData";
import { moviesPageService } from "@/modules/movies/movies.service";
import { AppRoutes, QueryString } from "@/types/enums";
import { prefetchMoviesOrSerialsForSearchPage } from "@/utils/utils";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { movieSearchParam } = context.query;

  return prefetchMoviesOrSerialsForSearchPage({
    searchPath: AppRoutes.SearchMovies,
    searchParam: movieSearchParam as string,
    queryString: QueryString.moviesForSearchPage,
    fetcher: () =>
      moviesPageService.fetchDataForSearchPage({
        searchPath: AppRoutes.SearchMovies,
        searchParam: movieSearchParam as string,
      }),
  });
};

const SearchMoviePage: NextPage = () => {
  const {
    query: { movieSearchParam },
  } = useRouter();

  const {
    fetchNextPage,
    hasNextPage,
    fetchedResults,
    pageTitle,
    dataLength,
    isLoading,
  } = useFetchSeeMoreOrSearchPageData({
    query: QueryString.moviesForSearchPage,
    fetcher: (pageParam) =>
      moviesPageService.fetchDataForSearchPage({
        searchPath: AppRoutes.SearchMovies,
        searchParam: movieSearchParam as string,
        pageParam,
      }),
    searchParam: movieSearchParam as string,
    isSearchResultsPage: true,
  });

  return (
    <Cards
      cards={fetchedResults}
      dataLength={dataLength}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage as boolean}
      isLoading={isLoading}
      route={AppRoutes.Movies}
      title={pageTitle}
    />
  );
};

export default SearchMoviePage;
