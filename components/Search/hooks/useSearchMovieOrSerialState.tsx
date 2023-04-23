import { debounce } from "lodash";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

import { AppRoutes } from "@/types/enums";
import { getSearchRedirectUrl } from "@/utils/utils";

type HookProps = {
  searchPath: AppRoutes;
  debounceTime?: number;
};

type ReturnedHookType = {
  searchTerm: string | null;
  isButtonDisabled: boolean;
  onSetNewSearchTerm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const useSearchMovieOrSerialState = ({
  searchPath,
  debounceTime = 300,
}: HookProps): ReturnedHookType => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  const searchRedirectUrl = useMemo(
    () => getSearchRedirectUrl(searchPath, debouncedValue),
    [searchPath, debouncedValue]
  );

  const debouncedHandleSearched = useMemo(
    () => debounce((value) => setDebouncedValue(value), debounceTime),
    [debounceTime]
  );

  const isButtonDisabled = !searchTerm;

  const onHandleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchTerm) return;

    router.push(searchRedirectUrl);
  };

  const onSetNewSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setSearchTerm(value);
    debouncedHandleSearched(value);
  };

  return {
    searchTerm,
    isButtonDisabled,
    onSetNewSearchTerm,
    onHandleFormSubmit,
  };
};
