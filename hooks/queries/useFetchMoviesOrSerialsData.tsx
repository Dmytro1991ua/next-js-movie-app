import { useQuery } from "react-query";

import { QueryString } from "@/types/enums";
import {
  FavoritesMoviesOrSerialsResult,
  GetUserAvatarResult,
  HomePageData,
  MovieOrSerialDetailsData,
  MoviesPageData,
  SerialsPageData,
  UpdateRatingResult,
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
    | (UpdateRatingResult | null)
    | (GetUserAvatarResult | null)
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
