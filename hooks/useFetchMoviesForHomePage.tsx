import { useQuery } from "react-query";

import { QueryString } from "@/types/enums";
import {
  HomePageData,
  MoviesPageData,
  SerialsPageData,
} from "@/types/interfaces";

export type HookProps<T> = {
  query: QueryString;
  fetcher: () => Promise<T>;
};

export type ReturnedHookType<T> = {
  data?: T;
  error: Error | null;
  isLoading: boolean;
};

export const useFetchMoviesOrSerials = <
  T extends HomePageData | MoviesPageData | SerialsPageData
>({
  query,
  fetcher,
}: HookProps<T>): ReturnedHookType<T> => {
  const { data, error, isLoading } = useQuery<T, Error>([query], fetcher, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isLoading,
  };
};
