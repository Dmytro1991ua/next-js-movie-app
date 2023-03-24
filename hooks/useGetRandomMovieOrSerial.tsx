import { useEffect, useState } from "react";

import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";

type HookProps<T> = {
  data: T[];
};

export type RandomMovieOrSerial = Movie & Serial;

type ReturnedHookType = {
  randomMovieOrSerial: (Movie & Serial) | null;
};

export const useGetRandomMovieOrSerial = <T extends Movie & Serial>({
  data,
}: HookProps<T>): ReturnedHookType => {
  const [randomMovieOrSerial, setRandomMovieOrSerial] = useState<T | null>(
    null
  );

  useEffect(() => {
    if (data.length) {
      setRandomMovieOrSerial(data[Math.floor(Math.random() * data.length)]);
    }
  }, [data]);

  return { randomMovieOrSerial };
};
