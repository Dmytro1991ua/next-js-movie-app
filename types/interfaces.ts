import { NextApiRequest, NextApiResponse } from "next";
import { DefaultUser, User } from "next-auth";

import { ButtonVariant } from "@/components/Button/Button.types";
import {
  Actor,
  Cast,
  Genre,
  MovieOrSerialDetail,
  ProductionCountryOrCompany,
  SpokenLanguage,
} from "@/model/common";
import { Movie } from "@/model/movie";
import { Rating } from "@/model/rating";
import { Serial } from "@/model/serial";
import { DefaultUserWithId } from "@/pages/api/auth/auth";
import {
  AppRoutes,
  DetailsBlockTitle,
  DetailsPageActionButtons,
  HeroContentActionButtons,
  QueryString,
  SeeMorePageRoutes,
} from "@/types/enums";

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

export interface UpdateUserProfile {
  payload: {
    userInfo: Omit<DefaultUser, "id"> & { password: string };
    user: DefaultUserWithId;
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

export interface UpdateRatingResponse {
  status_code: number;
  status_message: string;
}

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

export type DetailsBlockPosition = "column" | "row";

export type DetailsSubtitleWithPills = (
  | Genre
  | Actor
  | SpokenLanguage
  | ProductionCountryOrCompany
)[];

export interface DetailsBlockCommonConfig {
  id: string;
  className?: string;
  position: DetailsBlockPosition;
  title: DetailsBlockTitle;
}

export interface DetailsBlockWithPillsConfig extends DetailsBlockCommonConfig {
  hasSubtitlePill?: boolean;
  list?: DetailsSubtitleWithPills;
}

export interface MovieOrSerialWithRegularSubtitle
  extends DetailsBlockCommonConfig {
  subtitle?: string | number;
}

export interface DetailsPageActionButton {
  id: string;
  url: string;
  icon: JSX.Element;
  rel?: string;
  target?: string;
  label: DetailsPageActionButtons;
  className?: string;
  disabledClassName?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export interface HeroContentActionButtonConfig {
  onDetailsBtnClick: () => void;
  onPlayBtnClick: () => void;
}

export interface HeroContentActionButton {
  id: string;
  label: HeroContentActionButtons;
  icon: JSX.Element;
  variant: ButtonVariant;
  onClick: () => void;
}

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

export interface FavoritesIconConfigItem {
  id: string;
  icon: JSX.Element;
  onClick: () => void;
  isInFavorites: boolean;
}

export interface FavoritesIconProps {
  isInFavorites: boolean;
  onFavoriteIconClick: () => void;
}
