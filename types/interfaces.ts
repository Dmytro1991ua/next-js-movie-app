import { NextApiRequest, NextApiResponse } from "next";
import { DefaultUser, User } from "next-auth";

import { Cast, MovieOrSerialDetail } from "@/model/common";
import { Movie } from "@/model/movie";
import { Rating } from "@/model/rating";
import { Serial } from "@/model/serial";
import { DefaultUserWithId } from "@/pages/api/auth/auth";
import { AppRoutes, QueryString, SeeMorePageRoutes } from "@/types/enums";

import { RequestMethod, SliderTitle } from "./enums";

export interface NextAuthUser extends User {
  uid: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  emailVerified?: boolean;
  authTime?: string;
}

export type CreateUser = Pick<
  NextAuthUser,
  "name" | "email" | "password" | "image"
> & {
  res: NextApiResponse;
  isUserExist?: boolean;
  method?: RequestMethod;
};

export type UpdateExistingUser = Pick<NextAuthUser, "email"> & {
  res: NextApiResponse;
};

export interface AddToFavorite {
  res?: NextApiResponse;
  req?: NextApiRequest;
  method?: RequestMethod;
}

export type UpdateRating = AddToFavorite;
export type UpdateProfile = AddToFavorite;
export type GetUserAvatar = AddToFavorite;

export interface GetAvailableMoviesOrSerialsPayload {
  payload: {
    user: DefaultUser;
  };
}
export interface AddToFavoritePayload {
  payload: {
    favorites?: MovieOrSerialResults | MovieOrSerialDetail;
    user?: DefaultUserWithId;
  };
}

export interface RemoveFromFavoritePayload {
  payload: {
    id: number | string;
    user?: DefaultUserWithId;
  };
}

export type GetRatingById = {
  payload: {
    id?: number | string;
    user?: DefaultUserWithId;
  };
};
export interface AddRatingPayload {
  payload: {
    data: Rating;
    user?: DefaultUserWithId;
  };
}

export interface UpdateUserProfilePayload {
  payload: {
    userInfo: Omit<DefaultUser, "id"> & { password?: string };
    user?: DefaultUserWithId;
  };
}

export interface GetUserAvatarPayload {
  payload: {
    user?: DefaultUserWithId;
  };
}

export type ApiRequestConfigForHomePage = {
  fetchTrendingMovies: string;
  fetchTopRatedMovies: string;
  fetchUpcomingMovies: string;
  fetchPopularMovies: string;
  fetchLatestMovies: string;
  fetchNowPlayingMovies: string;
};

export type ApiRequestConfigForMoviesPage = {
  fetchActionMovies: string;
  fetchComedyMovies: string;
  fetchHorrorMovies: string;
  fetchThrillerMovies: string;
  fetchHistoryMovies: string;
  fetchDocumentariesMovies: string;
  fetchWarMovies: string;
  fetchWesternMovies: string;
};

export type ApiRequestConfigForSerialsPage = {
  fetchLatestSerials: string;
  fetchSerialsAiringToday: string;
  fetchSerialsOnAir: string;
  fetchPopularSerials: string;
  fetchTopRatedSerials: string;
};

export type MovieOrSerialResults = Movie & Serial;
export interface FavoritesMoviesOrSerialsResult {
  success: boolean;
  data: (MovieOrSerialResults & MovieOrSerialResults[]) | null;
  message?: string;
}

export interface UpdateRatingResult {
  success: boolean;
  data: Rating[];
  message?: string;
}

export interface GetUserAvatarResult {
  success: boolean;
  data: {
    image: string;
    name: string;
  };
  message?: string;
}

export type UpdateProfileData = Omit<UpdateRatingResult, "data">;

export type MovieOrSerialResult = {
  page: number;
  results: MovieOrSerialResults[];
  total_pages: number;
  total_results: number;
};

export type HomePageData = {
  latestMovies: Movie | null;
  nowPlayingMovies: MovieOrSerialResult | null;
  popularMovies: MovieOrSerialResult | null;
  topRatedMovies: MovieOrSerialResult | null;
  trendingMovies: MovieOrSerialResult | null;
  upcomingMovies: MovieOrSerialResult | null;
  favorites?: MovieOrSerialResults[] | null;
};

export type MoviesPageData = {
  actionMovies: MovieOrSerialResult | null;
  comedyMovies: MovieOrSerialResult | null;
  horrorMovies: MovieOrSerialResult | null;
  thrillerMovies: MovieOrSerialResult | null;
  historyMovies: MovieOrSerialResult | null;
  documentariesMovies: MovieOrSerialResult | null;
  warMovies: MovieOrSerialResult | null;
  westernMovies: MovieOrSerialResult | null;
  favorites?: MovieOrSerialResults | null;
};

export type SerialsPageData = {
  latestSerials: MovieOrSerialResult | null;
  serialsAiringToday: MovieOrSerialResult | null;
  serialsOnAir: MovieOrSerialResult | null;
  popularSerials: MovieOrSerialResult | null;
  topRatedSerials: MovieOrSerialResult | null;
  favorites?: MovieOrSerialResults | null;
};

export type AppPageData = HomePageData & MoviesPageData & SerialsPageData;

export interface SliderConfig {
  id: string;
  data: MovieOrSerialResults[];
  title: SliderTitle;
  className?: string;
  isHomePage?: boolean;
  isMoviesPage?: boolean;
  isSerialsPage?: boolean;
  seeMoreRoute?: SeeMorePageRoutes;
  route?: AppRoutes;
  hasFavorites?: boolean;
  favoritesSeeMoreRoute?: SeeMorePageRoutes;
}

export interface PageSlider<T> {
  data: T;
  isHomePage?: boolean;
  isMoviesPage?: boolean;
  isSerialsPage?: boolean;
  route?: AppRoutes;
  hasFavorites?: boolean;
  favoritesSeeMoreRoute?: SeeMorePageRoutes;
}

export type MovieOrSerialDetailsData = {
  movieOrSerialDetails: MovieOrSerialDetail | null;
  movieOrSerialActors: Cast | null;
};

export type Status = "idle" | "error" | "loading" | "success";

export interface DataFetcherProps {
  searchPath?: AppRoutes;
  searchParam?: string;
  pageParam?: number;
}

export interface PrefetchDataForSearchPageProps {
  searchParam: string;
  searchPath: AppRoutes;
  queryString: QueryString;
  fetcher: ({
    searchPath,
    searchParam,
    pageParam = 1,
  }: DataFetcherProps) => Promise<MovieOrSerialResult | null>;
  pageParam?: number;
}

export interface FromInputConfig {
  fullWidth?: boolean;
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
  disabled?: boolean;
}

export type MediaType = "movies" | "serials" | "";
export type RequestAction = "fetch" | "update" | "delete";
export type ContentType = "movie" | "tv";
