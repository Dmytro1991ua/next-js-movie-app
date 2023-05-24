import { useQuery } from "react-query";

import { QueryString } from "@/types/enums";
import {
  FavoritesMoviesOrSerialsResult,
  HomePageData,
  MovieOrSerialDetailsData,
  MoviesPageData,
  SerialsPageData,
} from "@/types/interfaces";

export type HookProps<T> = {
  query: QueryString;
  fetcher: () => Promise<T>;
  isRefetchOnMount?: boolean;
};

export type ReturnedHookType<T> = {
  data?: T;
  error: Error | null;
  isLoading: boolean;
};

export const useFetchMoviesOrSerialsData = <
  T extends
    | HomePageData
    | MoviesPageData
    | SerialsPageData
    | MovieOrSerialDetailsData
    | (FavoritesMoviesOrSerialsResult | null)
>({
  query,
  fetcher,
  isRefetchOnMount = false,
}: HookProps<T>): ReturnedHookType<T> => {
  const { data, error, isLoading } = useQuery<T, Error>([query], fetcher, {
    refetchOnMount: isRefetchOnMount,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};
