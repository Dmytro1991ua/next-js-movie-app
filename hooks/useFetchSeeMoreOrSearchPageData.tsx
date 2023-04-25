import { useMemo } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";

import {
  QueryString,
  SeeMorePageQueryString,
  SliderTitle,
} from "@/types/enums";
import {
  MovieOrSerialResult,
  MovieOrSerialResults,
  Status,
} from "@/types/interfaces";
import {
  getMovieOrSerialDataLength,
  getMoviesOrSerialsPageData,
  getTitleForSeeMoreOrSearchPage,
} from "@/utils/utils";

export type HookProps = {
  query: SeeMorePageQueryString | QueryString;
  fetcher: (pageParam?: number) => Promise<MovieOrSerialResult | null>;
  title?: SliderTitle;
  isMovie?: boolean;
  searchParam?: string;
  isSearchResultsPage?: boolean;
};

export type ReturnedHookType = {
  status: Status;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<MovieOrSerialResult | null, Error>>;
  hasNextPage?: boolean;
  fetchedResults: (MovieOrSerialResults | undefined)[];
  pageTitle: string;
  dataLength: number;
  isLoading: boolean;
};

export const useFetchSeeMoreOrSearchPageData = ({
  query,
  fetcher,
  title,
  isMovie,
  searchParam,
  isSearchResultsPage,
}: HookProps): ReturnedHookType => {
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<MovieOrSerialResult | null, Error>(
      [query],
      async ({ pageParam = 1 }) => fetcher(pageParam),
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        getNextPageParam: (lastPage) => {
          return lastPage && lastPage.page < lastPage.total_pages
            ? lastPage.page + 1
            : undefined;
        },
      }
    );

  const fetchedResults = useMemo(
    () => getMoviesOrSerialsPageData(data),
    [data]
  );

  const pageTitle = useMemo(
    () =>
      getTitleForSeeMoreOrSearchPage({
        searchParam: searchParam ?? "",
        title,
        isMovie,
        isSearchResultsPage,
        totalSearchResults: data?.pages[0]?.total_results ?? 0,
      }),
    [data?.pages, isMovie, isSearchResultsPage, searchParam, title]
  );

  const dataLength =
    useMemo(() => getMovieOrSerialDataLength(data), [data]) ?? 0;

  return {
    status,
    fetchNextPage,
    hasNextPage,
    fetchedResults,
    pageTitle,
    dataLength,
    isLoading: isFetchingNextPage,
  };
};
