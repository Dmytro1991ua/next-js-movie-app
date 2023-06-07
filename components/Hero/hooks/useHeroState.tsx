import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";

import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import { useTrailerState } from "@/hooks/useTrailerState";
import { Movie } from "@/model/movie";
import { Rating } from "@/model/rating";
import { Serial } from "@/model/serial";
import { homePageService } from "@/modules/home/home.service";
import { AppRoutes, QueryString } from "@/types/enums";
import { UpdateRatingResult } from "@/types/interfaces";
import { getStarRatingValue, handleRedirectToDetailsPage } from "@/utils/utils";

type HookProps<T> = {
  data: T[];
  route?: AppRoutes;
};

type ReturnedHookType = {
  isTrailerShown: boolean;
  trailerUrl: string | null;
  initialRatingValue: number;
  newRatingData: Pick<Rating, "id" | "name">;
  randomMovieOrSerial: (Movie & Serial) | null;
  onTrailerOpening: () => void;
  onTrailerClosing: () => void;
  onHandleRedirectToDetailsPage: () => void;
};

export const useHeroState = <T extends Movie & Serial>({
  data,
  route,
}: HookProps<T>): ReturnedHookType => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: newRating } = useFetchMoviesOrSerialsData<UpdateRatingResult>({
    query: QueryString.movieOrSerialRating,
    fetcher: () => homePageService.fetchRatingById(session?.user),
    isRefetchOnMount: true,
  });

  const { randomMovieOrSerial } = useGetRandomMovieOrSerial({ data });

  const { isTrailerShown, trailerUrl, onTrailerOpening, onTrailerClosing } =
    useTrailerState({
      id: randomMovieOrSerial?.id,
      name: randomMovieOrSerial?.name ?? randomMovieOrSerial?.title,
    });

  const onHandleRedirectToDetailsPage = useCallback(
    () =>
      handleRedirectToDetailsPage({
        router,
        route,
        id: randomMovieOrSerial?.id,
      }),
    [randomMovieOrSerial?.id, route, router]
  );

  const initialRatingValue = useMemo(
    () =>
      getStarRatingValue(
        randomMovieOrSerial?.vote_average ?? 0,
        newRating?.data ?? [],
        randomMovieOrSerial?.id ?? 0
      ),
    [randomMovieOrSerial?.vote_average, newRating, randomMovieOrSerial?.id]
  );

  const newRatingData: Pick<Rating, "id" | "name"> = {
    id: randomMovieOrSerial?.id ?? 0,
    name: (randomMovieOrSerial?.title || randomMovieOrSerial?.name) ?? "",
  };

  return {
    isTrailerShown,
    trailerUrl,
    initialRatingValue,
    newRatingData,
    randomMovieOrSerial,
    onTrailerOpening,
    onTrailerClosing,
    onHandleRedirectToDetailsPage,
  };
};
