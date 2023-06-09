import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";

import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { homePageService } from "@/modules/home/home.service";
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

  const { data: newRating } = useFetchMoviesOrSerialsData<UpdateRatingResult>({
    query: QueryString.movieOrSerialRating,
    fetcher: () => homePageService.fetchRatingById(session?.user),
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
        posterPath: movieOrSerialData?.poster_path ?? "",
        backdropPath: movieOrSerialData?.backdrop_path ?? "",
        isCard: true,
      }),
    [movieOrSerialData?.poster_path, movieOrSerialData?.backdrop_path]
  );

  const initialRatingValue = useMemo(
    () =>
      getStarRatingValue(
        movieOrSerialData?.vote_average ?? 0,
        newRating?.data ?? [],
        movieOrSerialData?.id ?? 0
      ),
    [movieOrSerialData?.vote_average, newRating, movieOrSerialData?.id]
  );

  return {
    imageUrl,
    initialRatingValue,
    onHandleRedirectToDetailsPage,
  };
};
