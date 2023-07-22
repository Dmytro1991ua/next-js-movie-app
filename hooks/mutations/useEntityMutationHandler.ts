import { UseMutateFunction, useMutation, useQueryClient } from "react-query";

import { toastService } from "@/services/toast.service";
import { QueryString } from "@/types/enums";
import {
  FavoritesMoviesOrSerialsResult,
  UpdateProfileData,
  UpdateRatingResult,
} from "@/types/interfaces";

type HookProps<T> = {
  queryKey: QueryString;
  mutationFn: () => Promise<T | null>;
};

type ReturnedHookType<T> = {
  isLoading: boolean;
  mutate: UseMutateFunction<T | null, Error, void, unknown>;
  error: Error | null;
  data?: T | null;
};

export const useEntityMutationHandler = <
  T extends
    | FavoritesMoviesOrSerialsResult
    | UpdateRatingResult
    | UpdateProfileData
>({
  queryKey,
  mutationFn,
}: HookProps<T>): ReturnedHookType<T> => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, mutate } = useMutation<T | null, Error>(
    mutationFn,
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([queryKey]);
        toastService.success(data?.message as string);
      },
      onError: (error) => {
        toastService.error(error.message);
      },
    }
  );

  return { data, isLoading, error, mutate };
};
