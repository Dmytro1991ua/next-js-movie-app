import { hash } from "bcryptjs";
import { filter, shuffle } from "lodash";
import { NextRouter } from "next/router";
import { QueryClient, dehydrate } from "react-query";
import { v4 as uuidv4 } from "uuid";

import Slider from "@/components/Slider";
import { Rating } from "@/model/rating";
import { RequestOption } from "@/modules/auth/auth.types";
import { SMALL_IMAGE_URL } from "@/types/constants";
import {
  AppRoutes,
  QueryString,
  RequestMethod,
  SeeMorePageRoutes,
  SliderTitle,
} from "@/types/enums";
import {
  AppPageData,
  FavoritesMoviesOrSerialsResult,
  HomePageData,
  MovieOrSerialDetailsData,
  MovieOrSerialResults,
  MoviesPageData,
  PageSlider,
  PrefetchDataForSearchPageProps,
  SerialsPageData,
} from "@/types/interfaces";

import { sliderConfig } from "./configs";
import DefaultImage from "../public/assets/auth-layout/auth-layout-bg-big.jpg";

export const convertResponseErrorMessageToCorrectFormat = (
  method: RequestMethod
): string =>
  `The request method is not valid. Only the ${method} method is accepted`;

export const getResponseErrorMessage = (isSerials = false): string => {
  return `Failed to load ${isSerials ? "Serials" : "Movies"}`;
};

export const getResponseErrorMessageForDetailsPage = (
  isSerial = false
): string => {
  return `Failed to load ${isSerial ? "Serial" : "Movie"} details`;
};

export const getPageSlider = <T,>({
  data,
  isHomePage,
  isMoviesPage,
  isSerialsPage,
  route,
  hasFavorites,
  favoritesSeeMoreRoute,
}: PageSlider<T>): JSX.Element => {
  const availableSliders = sliderConfig({
    data: data as AppPageData,
    isHomePage,
    isMoviesPage,
    isSerialsPage,
    route,
    hasFavorites,
    favoritesSeeMoreRoute,
  });

  return (
    <>
      {availableSliders.map(
        ({
          data,
          title,
          className,
          isHomePage,
          isMoviesPage,
          isSerialsPage,
          route,
          seeMoreRoute,
          hasFavorites,
        }) => (
          <>
            {(isHomePage || isMoviesPage || isSerialsPage || hasFavorites) && (
              <Slider
                key={uuidv4()}
                className={className}
                data={shuffle(data)}
                route={route}
                seeMoreRoute={seeMoreRoute ?? favoritesSeeMoreRoute}
                title={title}
              />
            )}
          </>
        )
      )}
    </>
  );
};

export const getSeeMorePageRoutesForHomePage = (pathname: string): boolean => {
  return (
    pathname === SeeMorePageRoutes.NowPlaying ||
    pathname === SeeMorePageRoutes.Popular ||
    pathname === SeeMorePageRoutes.TopRated ||
    pathname === SeeMorePageRoutes.Trending ||
    pathname === SeeMorePageRoutes.Upcoming ||
    pathname === SeeMorePageRoutes.FavoritesHomePage
  );
};

export const getSeeMorePageRoutesForMoviesPage = (
  pathname: string
): boolean => {
  return (
    pathname === SeeMorePageRoutes.ActionMovies ||
    pathname === SeeMorePageRoutes.ComedyMovies ||
    pathname === SeeMorePageRoutes.Documentaries ||
    pathname === SeeMorePageRoutes.HistoryMovies ||
    pathname === SeeMorePageRoutes.HorrorMovies ||
    pathname === SeeMorePageRoutes.ThrillerMovies ||
    pathname === SeeMorePageRoutes.WarMovies ||
    pathname === SeeMorePageRoutes.WesternMovies ||
    pathname === SeeMorePageRoutes.FavoritesMoviesPage
  );
};

export const getSeeMorePageRoutesForSerialsPage = (pathname: string) => {
  return (
    pathname === SeeMorePageRoutes.PopularSerials ||
    pathname === SeeMorePageRoutes.SerialsAiringToday ||
    pathname === SeeMorePageRoutes.SerialsOnAir ||
    pathname === SeeMorePageRoutes.TopRatedSerials ||
    pathname === SeeMorePageRoutes.FavoritesSerialsPage
  );
};

export const isRouteActive = ({
  asPath,
  pathname,
  url,
}: {
  asPath: string;
  pathname: string;
  url: string;
}): boolean => {
  const seeMorePageRoutesForHomePage =
    getSeeMorePageRoutesForHomePage(pathname);

  const seeMorePageRoutesForMoviesPage =
    getSeeMorePageRoutesForMoviesPage(pathname);

  const seeMorePageRoutesForSerialsPage =
    getSeeMorePageRoutesForSerialsPage(pathname);

  const homePageNestedRoutes =
    url === AppRoutes.Home &&
    (pathname === AppRoutes.MovieDetails || seeMorePageRoutesForHomePage);

  const moviesPageNestedRoutes =
    url === AppRoutes.Movies &&
    (pathname === AppRoutes.MovieByGenreDetails ||
      seeMorePageRoutesForMoviesPage);

  const serialsPageNestedRoutes =
    url === AppRoutes.Serials &&
    (pathname === AppRoutes.SerialDetails || seeMorePageRoutesForSerialsPage);

  return (
    asPath === url ||
    homePageNestedRoutes ||
    moviesPageNestedRoutes ||
    serialsPageNestedRoutes
  );
};

export const handleRedirectToDetailsPage = ({
  router,
  route,
  id,
}: {
  router: NextRouter;
  route?: AppRoutes;
  id?: number;
}) => {
  router.push(`${route}/${id}`);
};

export const prefetchMovieOrSerialData = async <
  T extends
    | HomePageData
    | MoviesPageData
    | SerialsPageData
    | (FavoritesMoviesOrSerialsResult | null)
>(
  queryString: QueryString,
  fetcher: () => Promise<T>
) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryString, fetcher);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const prefetchMovieOrSerialDetailsData = async ({
  id,
  queryString,
  fetcher,
}: {
  id: string;
  queryString: QueryString;
  fetcher: (id: string) => Promise<MovieOrSerialDetailsData>;
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryString, () => fetcher(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const prefetchMoviesOrSerialsForSearchPage = async ({
  searchParam,
  searchPath,
  queryString,
  fetcher,
  pageParam,
}: PrefetchDataForSearchPageProps) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(queryString, () =>
    fetcher({ searchPath, searchParam, pageParam }).then((data) => {
      return {
        pages: [data],
      };
    })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export const getImageUrl = ({
  posterPath,
  backdropPath,
  isCard = false,
}: {
  posterPath: string;
  backdropPath: string;
  isCard?: boolean;
}) => {
  const imagePath = isCard
    ? posterPath || backdropPath
    : backdropPath || posterPath;

  return imagePath ? `${SMALL_IMAGE_URL}${imagePath}` : DefaultImage;
};

export const getRequestOptions = ({
  method,
  body,
}: Pick<RequestOption, "method" | "body">): RequestOption => {
  return {
    method,
    headers: { "Content-Type": "application/json" },
    body,
  };
};

export const getFavoritesDataBasedOnRoute = (
  favorites: MovieOrSerialResults[] | null,
  route: AppRoutes
) => {
  return route === AppRoutes.Serials
    ? filter(favorites, "name")
    : filter(favorites, "title");
};

export const convertTMDBRatingToStarRating = (rating: number) =>
  Math.round(rating / 2);

export const convertStarRatingToTMDBRating = (rating: number) => rating * 2;

export const getNewRatingFromDB = (newRatingData: Rating[], id: number) =>
  newRatingData.find((rating) => rating.id === id)?.rating ?? 0;

export const getStarRatingValue = (
  tmdbRating: number,
  newRatingData: Rating[],
  id: number
) => {
  const newRating = getNewRatingFromDB(newRatingData, id);

  return newRating
    ? convertTMDBRatingToStarRating(newRating)
    : convertTMDBRatingToStarRating(tmdbRating);
};

export const fetchDataWithHandling = async <T,>({
  url,
  mediaType,
  action,
  options,
  genre = SliderTitle.Default,
  message = "",
}: {
  url: string;
  mediaType: "movies" | "serials" | "";
  action: "fetch" | "update" | "delete";
  options?: RequestOption;
  genre?: SliderTitle;
  message?: string;
}): Promise<T | null> => {
  const response = await fetch(url, options);

  const errorMessage = message
    ? message
    : `Failed to ${action} ${genre} ${mediaType}: ${
        response.statusText ?? "Unknown error"
      }`;

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (e) {
    throw new Error((e as Error).message);
  }
};

export const handleHashPassword = async (password: string): Promise<string> => {
  return await hash(password, 12);
};
