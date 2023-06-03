import { UseMutateFunction, useMutation, useQueryClient } from "react-query";

import { toastService } from "@/services/toast.service";
import { QueryString } from "@/types/enums";
import { FavoritesMoviesOrSerialsResult } from "@/types/interfaces";

export type HookProps = {
  queryKey: QueryString;
  mutationFn: () => Promise<FavoritesMoviesOrSerialsResult | null>;
};

export type ReturnedHookType = {
  isLoading: boolean;
  mutate: UseMutateFunction<
    FavoritesMoviesOrSerialsResult | null,
    Error,
    void,
    unknown
  >;
  error: Error | null;
  data?: FavoritesMoviesOrSerialsResult | null;
};

export const useUpdateFavoritesMoviesOrSerials = ({
  queryKey,
  mutationFn,
}: HookProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, mutate } = useMutation<
    FavoritesMoviesOrSerialsResult | null,
    Error
  >(mutationFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKey]);
      toastService.success(data?.message as string);
    },
    onError: (error) => {
      toastService.error(error.message);
    },
  });

  return { data, isLoading, error, mutate };
};
