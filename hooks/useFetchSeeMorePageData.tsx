import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useInfiniteQuery,
} from "react-query";

import { SeeMorePageQueryString } from "@/types/enums";
import { MovieOrSerialResult, Status } from "@/types/interfaces";

export type HookProps = {
  query: SeeMorePageQueryString;
  fetcher: () => Promise<MovieOrSerialResult | null>;
};

export type ReturnedHookType = {
  data?: InfiniteData<MovieOrSerialResult | null>;
  status: Status;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<MovieOrSerialResult | null, Error>>;
  hasNextPage?: boolean;
};

export const useFetchSeeMorePageData = ({
  query,
  fetcher,
}: HookProps): ReturnedHookType => {
  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery<
    MovieOrSerialResult | null,
    Error
  >([query], fetcher, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    status,
    fetchNextPage,
    hasNextPage,
  };
};
