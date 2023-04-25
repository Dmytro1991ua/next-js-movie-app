import { NextApiResponse } from "next";
import { User } from "next-auth";

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
import { Serial } from "@/model/serial";
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
};

export type SerialsPageData = {
  latestSerials: MovieOrSerialResult | null;
  serialsAiringToday: MovieOrSerialResult | null;
  serialsOnAir: MovieOrSerialResult | null;
  popularSerials: MovieOrSerialResult | null;
  topRatedSerials: MovieOrSerialResult | null;
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
}

export interface PageSlider<T> {
  data: T;
  isHomePage?: boolean;
  isMoviesPage?: boolean;
  isSerialsPage?: boolean;
  route?: AppRoutes;
}

export type MovieOrSerialDetailsData = {
  movieOrSerialDetails: MovieOrSerialDetail;
  movieOrSerialActors: Cast;
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
