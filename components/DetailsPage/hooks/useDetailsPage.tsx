import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useMemo } from "react";

import { useUpdateFavoritesMoviesOrSerials } from "@/hooks/mutations/useUpdateFavoritesMoviesOrSerials";
import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { useTrailerState } from "@/hooks/useTrailerState";
import { Cast, MovieOrSerialDetail } from "@/model/common";
import { homePageService } from "@/modules/home/home.service";
import { QueryString, RequestMethod } from "@/types/enums";
import { UpdateRatingResult } from "@/types/interfaces";
import {
  detailsSubtitleWithPillsConfig,
  getDetailsBlockByConfig,
  getDetailsPageActionButtons,
  getFavoritesIcon,
  getFavoritesId,
  getIsMovieOrSerialInFavorites,
  getNewRatingFromDB,
  getStarRatingValue,
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
  favoriteIcon: JSX.Element[];
  initialRatingValue: number;
  newRating: number;
  onTrailerClosing: () => void;
  onGoBackRedirect: () => void;
};

export const useDetailsPage = ({
  movieOrSerialDetails,
  movieOrSerialCast,
}: HookProps): ReturnedHookType => {
  const router = useRouter();
  const { data: session } = useSession();

  const { data: favorites } = useFetchMoviesOrSerialsData({
    query: QueryString.favoritesMoviesOrSerials,
    fetcher: () => homePageService.fetchFavoritesMoviesOrSerials(session?.user),
    isRefetchOnMount: true,
  });

  const { data: newRating } = useFetchMoviesOrSerialsData<UpdateRatingResult>({
    query: QueryString.movieOrSerialRating,
    fetcher: () => homePageService.fetchRatingById(session?.user),
    isRefetchOnMount: true,
  });

  const { mutate: addToFavorites } = useUpdateFavoritesMoviesOrSerials({
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

  const favoritesMovieOrSerialId = useMemo(
    () => getFavoritesId(movieOrSerialDetails?.id, favorites?.data),
    [favorites?.data, movieOrSerialDetails?.id]
  );
  const { mutate: removeFromFavorites } = useUpdateFavoritesMoviesOrSerials({
    queryKey: QueryString.favoritesMoviesOrSerials,
    mutationFn: () =>
      homePageService.updateFavoriteMovieOrSerial(
        {
          id: favoritesMovieOrSerialId,
          user: session?.user,
        },
        RequestMethod.DELETE
      ),
  });

  const isMovieOrSerialInFavorite = useMemo(
    () =>
      getIsMovieOrSerialInFavorites(movieOrSerialDetails?.id, favorites?.data),
    [favorites?.data, movieOrSerialDetails?.id]
  );

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
  const onFavoriteIconClick = useCallback(
    () =>
      isMovieOrSerialInFavorite ? removeFromFavorites() : addToFavorites(),
    [addToFavorites, isMovieOrSerialInFavorite, removeFromFavorites]
  );

  const favoriteIcon = useMemo(
    () =>
      getFavoritesIcon({
        isInFavorites: isMovieOrSerialInFavorite,
        onFavoriteIconClick,
      }),
    [isMovieOrSerialInFavorite, onFavoriteIconClick]
  );

  const initialRatingValue = useMemo(
    () =>
      getStarRatingValue(
        movieOrSerialDetails?.vote_average ?? 0,
        newRating?.data ?? [],
        movieOrSerialDetails?.id ?? 0
      ),
    [movieOrSerialDetails?.vote_average, newRating, movieOrSerialDetails?.id]
  );

  const newRatingValue = useMemo(
    () =>
      getNewRatingFromDB(newRating?.data ?? [], movieOrSerialDetails?.id ?? 0),
    [newRating?.data, movieOrSerialDetails?.id]
  );

  return {
    detailsBlockWithPillsSubtitle,
    detailsBlockWithMovieOrSerialRelease,
    detailsBlockWithRevenueOrSeasonsDetails,
    detailsPageActionButtons,
    isTrailerShown,
    trailerUrl,
    favoriteIcon,
    initialRatingValue,
    newRating: newRatingValue,
    onTrailerClosing,
    onGoBackRedirect,
  };
};
