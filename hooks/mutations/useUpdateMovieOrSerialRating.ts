import { UseMutateFunction, useMutation, useQueryClient } from "react-query";

import { toastService } from "@/services/toast.service";
import { QueryString } from "@/types/enums";
import { UpdateRatingResult } from "@/types/interfaces";

export type HookProps = {
  queryKey: QueryString;
  mutationFn: () => Promise<UpdateRatingResult | null>;
};

export type ReturnedHookType = {
  isLoading: boolean;
  mutate: UseMutateFunction<UpdateRatingResult | null, Error, void, unknown>;
  error: Error | null;
  data?: UpdateRatingResult | null;
};

export const useUpdateMovieOrSerialRating = ({
  queryKey,
  mutationFn,
}: HookProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, mutate } = useMutation<
    UpdateRatingResult | null,
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
