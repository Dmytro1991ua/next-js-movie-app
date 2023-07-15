import { useCallback, useMemo, useState } from "react";

import { getTrailerUrl, getWarningMessageWhenTrailerNotFound } from "./utils";

interface HoopProps {
  id?: string | number;
  name?: string;
}

interface ReturnedHookType {
  isTrailerShown: boolean;
  trailerUrl: string | null;
  onTrailerOpening: () => void;
  onTrailerClosing: () => void;
}

export const useTrailerState = ({ id, name }: HoopProps): ReturnedHookType => {
  const [isTrailerShown, setIsTrailerShown] = useState<boolean>(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const warningMessageWhenTrailerNoFound = useMemo(
    () => getWarningMessageWhenTrailerNotFound(name),
    [name]
  );

  const movieOrSerialTrailerUrl = useCallback(
    () =>
      getTrailerUrl({
        message: warningMessageWhenTrailerNoFound,
        onSetTrailer: setTrailerUrl,
        id,
      }),
    [id, warningMessageWhenTrailerNoFound]
  );

  const onTrailerOpening = useCallback(async () => {
    setIsTrailerShown(true);

    await movieOrSerialTrailerUrl();
  }, [movieOrSerialTrailerUrl]);

  const onTrailerClosing = useCallback(() => {
    setIsTrailerShown(false);
    setTrailerUrl(null);
  }, []);

  return { isTrailerShown, trailerUrl, onTrailerOpening, onTrailerClosing };
};
