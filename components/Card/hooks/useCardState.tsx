import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";

import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { ratingService } from "@/services/rating.service";
import { AppRoutes, QueryString } from "@/types/enums";
import { MovieOrSerialResults, UpdateRatingResult } from "@/types/interfaces";
import {
  getImageUrl,
  getStarRatingValue,
  handleRedirectToDetailsPage,
} from "@/utils/utils";

type HookProps = {
  movieOrSerialData?: MovieOrSerialResults;
  route: AppRoutes;
};

type ReturnedHookType = {
  imageUrl: string | StaticImageData;
  initialRatingValue: number;
  onHandleRedirectToDetailsPage: () => void;
};

export const useCardState = ({
  movieOrSerialData,
  route,
}: HookProps): ReturnedHookType => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: newRating } =
    useFetchMoviesOrSerialsData<UpdateRatingResult | null>({
      query: QueryString.movieOrSerialRating,
      fetcher: () => ratingService.fetchRatingById(session?.user),
      isRefetchOnMount: true,
    });

  const onHandleRedirectToDetailsPage = useCallback(
    () =>
      handleRedirectToDetailsPage({
        router,
        route,
        id: movieOrSerialData?.id,
      }),
    [movieOrSerialData?.id, route, router]
  );

  const imageUrl = useMemo(
    () =>
      getImageUrl({
        posterPath: movieOrSerialData?.poster_path as string,
        backdropPath: movieOrSerialData?.backdrop_path as string,
        isCard: true,
      }),
    [movieOrSerialData?.poster_path, movieOrSerialData?.backdrop_path]
  );

  const initialRatingValue = useMemo(
    () =>
      getStarRatingValue(
        movieOrSerialData?.vote_average as number,
        newRating?.data ?? [],
        movieOrSerialData?.id as number
      ),
    [movieOrSerialData?.vote_average, newRating, movieOrSerialData?.id]
  );

  return {
    imageUrl,
    initialRatingValue,
    onHandleRedirectToDetailsPage,
  };
};
