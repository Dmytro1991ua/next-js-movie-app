import { UseMutateFunction, useMutation, useQueryClient } from "react-query";

import { toastService } from "@/services/toast.service";
import { QueryString } from "@/types/enums";
import { UpdateProfileData } from "@/types/interfaces";

export type HookProps = {
  queryKey: QueryString;
  mutationFn: () => Promise<UpdateProfileData | null>;
};

export type ReturnedHookType = {
  isLoading: boolean;
  mutate: UseMutateFunction<UpdateProfileData | null, Error, void, unknown>;
  error: Error | null;
  data?: UpdateProfileData | null;
};

export const useUpdateProfileData = ({ queryKey, mutationFn }: HookProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, mutate } = useMutation<
    UpdateProfileData | null,
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
