import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";
import { UseMutateFunction } from "react-query";

import { useUpdateFavoritesMoviesOrSerials } from "@/hooks/mutations/useUpdateFavoritesMoviesOrSerials";
import { useTrailerState } from "@/hooks/useTrailerState";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import { homePageService } from "@/modules/home/home.service";
import { QueryString, RequestMethod } from "@/types/enums";
import { FavoritesMoviesOrSerialsResult } from "@/types/interfaces";
import {
  detailsSubtitleWithPillsConfig,
  getDetailsBlockByConfig,
  getDetailsPageActionButtons,
  movieOrSerialReleaseConfig,
  movieOrSerialRevenueOrSeasonsDetailsConfig,
} from "@/utils/utils";

type HookProps = {
  movieOrSerialDetails?: MovieOrSerialDetail;
  movieOrSerialCast?: Cast;
};

type ReturnedHookType = {
  detailsBlockWithPillsSubtitle: JSX.Element;
  detailsBlockWithMovieOrSerialRelease: JSX.Element;
  detailsBlockWithRevenueOrSeasonsDetails: JSX.Element;
  detailsPageActionButtons: JSX.Element;
  isTrailerShown: boolean;
  trailerUrl: string | null;
  onTrailerClosing: () => void;
  onGoBackRedirect: () => void;
  addToFavorites: UseMutateFunction<
    FavoritesMoviesOrSerialsResult | null,
    Error,
    void,
    unknown
  >;
  removeFromFavorites: UseMutateFunction<
    FavoritesMoviesOrSerialsResult | null,
    Error,
    void,
    unknown
  >;
};

export const useDetailsPage = ({
  movieOrSerialDetails,
  movieOrSerialCast,
}: HookProps): ReturnedHookType => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: addedFavorites, mutate: addToFavorites } =
    useUpdateFavoritesMoviesOrSerials({
      queryKey: QueryString.favoritesMoviesOrSerials,
      mutationFn: () =>
        homePageService.updateFavoriteMovieOrSerial(
          {
            favorites: movieOrSerialDetails,
            user: session?.user,
          },
          RequestMethod.PUT
        ),
    });

  const { mutate: removeFromFavorites } = useUpdateFavoritesMoviesOrSerials({
    queryKey: QueryString.favoritesMoviesOrSerials,
    mutationFn: () =>
      homePageService.updateFavoriteMovieOrSerial(
        {
          id: addedFavorites?.data._id,
          user: session?.user,
        },
        RequestMethod.DELETE
      ),
  });

  const { isTrailerShown, trailerUrl, onTrailerOpening, onTrailerClosing } =
    useTrailerState({
      id: movieOrSerialDetails?.id,
      name: movieOrSerialDetails?.name ?? movieOrSerialDetails?.title,
    });

  const detailsBlockWithPillsSubtitle = useMemo(
    () =>
      getDetailsBlockByConfig({
        config: detailsSubtitleWithPillsConfig,
        movieOrSerialDetails,
        movieOrSerialCast,
      }),
    [movieOrSerialDetails, movieOrSerialCast]
  );

  const detailsBlockWithMovieOrSerialRelease = useMemo(
    () =>
      getDetailsBlockByConfig({
        config: movieOrSerialReleaseConfig,
        movieOrSerialDetails,
        movieOrSerialCast,
      }),
    [movieOrSerialDetails, movieOrSerialCast]
  );

  const detailsBlockWithRevenueOrSeasonsDetails = useMemo(
    () =>
      getDetailsBlockByConfig({
        config: movieOrSerialRevenueOrSeasonsDetailsConfig,
        movieOrSerialDetails,
        movieOrSerialCast,
      }),
    [movieOrSerialDetails, movieOrSerialCast]
  );

  const detailsPageActionButtons = useMemo(
    () =>
      getDetailsPageActionButtons({
        movieOrSerialDetails,
        router,
        onPlayBtnClick: onTrailerOpening,
      }),
    [movieOrSerialDetails, router, onTrailerOpening]
  );

  const onGoBackRedirect = useCallback(() => router.back(), [router]);

  return {
    detailsBlockWithPillsSubtitle,
    detailsBlockWithMovieOrSerialRelease,
    detailsBlockWithRevenueOrSeasonsDetails,
    detailsPageActionButtons,
    isTrailerShown,
    trailerUrl,
    addToFavorites,
    removeFromFavorites,
    onTrailerClosing,
    onGoBackRedirect,
  };
};
