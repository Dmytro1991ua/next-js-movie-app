import { UseMutateFunction, useMutation, useQueryClient } from "react-query";

import { toastService } from "@/services/toast.service";
import { QueryString } from "@/types/enums";
import { UpdateRatingResponse } from "@/types/interfaces";

export type HookProps = {
  queryKey: QueryString;
  mutationFn: () => Promise<UpdateRatingResponse | null>;
};

export type ReturnedHookType = {
  isLoading: boolean;
  mutate: UseMutateFunction<UpdateRatingResponse | null, Error, void, unknown>;
  error: Error | null;
  data?: UpdateRatingResponse | null;
};

export const useUpdateMovieOrSerialRating = ({
  queryKey,
  mutationFn,
}: HookProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, mutate } = useMutation<
    UpdateRatingResponse | null,
    Error
  >(mutationFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries([queryKey]);
      toastService.success(data?.status_message as string);
    },
    onError: (error) => {
      toastService.error(error.message);
    },
  });

  return { data, isLoading, error, mutate };
};
