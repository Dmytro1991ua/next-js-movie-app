import { useMemo } from "react";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";

import { SeeMorePageQueryString, SliderTitle } from "@/types/enums";
import {
  MovieOrSerialResult,
  MovieOrSerialResults,
  Status,
} from "@/types/interfaces";
import {
  getMovieOrSerialDataLength,
  getMoviesOrSerialsPageData,
  getSeeMorePageTitle,
} from "@/utils/utils";

export type HookProps = {
  query: SeeMorePageQueryString;
  fetcher: (pageParam?: number) => Promise<MovieOrSerialResult | null>;
  title: SliderTitle;
  isMovie?: boolean;
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

export const useFetchSeeMorePageData = ({
  query,
  fetcher,
  title,
  isMovie,
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
    () => getSeeMorePageTitle({ title, isMovie }),
    [title, isMovie]
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
