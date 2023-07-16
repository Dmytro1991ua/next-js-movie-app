import CardsSkeleton from "@/components/Cards/Cards.skeleton";
import DetailsPageSkeleton from "@/components/DetailsPage/DetailsPage.skeleton";
import HeroSkeleton from "@/components/Hero/Hero.skeleton";
import { AppRoutes, SeeMorePageRoutes } from "@/types/enums";

import AuthLayoutSkeleton from "./AuthLayout/AuthLayout.skeleton";
import SignInSkeleton from "../auth/components/SignIn/SignIn.skeleton";
import SignUpSkeleton from "../auth/components/SignUp/SignUp.skeleton";
import ProfileSkeleton from "../profile/Profile.skeleton";

const withAuthLayout = (component: JSX.Element) => (
  <div className="flex h-screen">
    <AuthLayoutSkeleton>{component}</AuthLayoutSkeleton>
  </div>
);
const generateCardsSkeleton = () => <CardsSkeleton />;
const generateHeroSkeleton = () => <HeroSkeleton />;
const generateDetailsPageSkeleton = () => <DetailsPageSkeleton />;
const generateProfileSkeleton = () => <ProfileSkeleton />;

const mainRoutes: Record<AppRoutes, JSX.Element> = {
  [AppRoutes.SignIn]: withAuthLayout(<SignInSkeleton />),
  [AppRoutes.SignUp]: withAuthLayout(<SignUpSkeleton />),
  [AppRoutes.Profile]: generateProfileSkeleton(),
  [AppRoutes.Home]: generateHeroSkeleton(),
  [AppRoutes.Movies]: generateHeroSkeleton(),
  [AppRoutes.MovieDetails]: generateDetailsPageSkeleton(),
  [AppRoutes.MovieByGenreDetails]: generateDetailsPageSkeleton(),
  [AppRoutes.Serials]: generateHeroSkeleton(),
  [AppRoutes.SerialDetails]: generateDetailsPageSkeleton(),
  [AppRoutes.SearchMovies]: generateCardsSkeleton(),
  [AppRoutes.SearchMoviesDetails]: generateCardsSkeleton(),
  [AppRoutes.SearchSerials]: generateCardsSkeleton(),
  [AppRoutes.SearchSerialsDetails]: generateCardsSkeleton(),
  [AppRoutes.Default]: generateHeroSkeleton(),
};

const seeMorePageRoutes: Record<SeeMorePageRoutes, JSX.Element> = {
  [SeeMorePageRoutes.ActionMovies]: generateCardsSkeleton(),
  [SeeMorePageRoutes.ComedyMovies]: generateCardsSkeleton(),
  [SeeMorePageRoutes.Documentaries]: generateCardsSkeleton(),
  [SeeMorePageRoutes.FavoritesHomePage]: generateCardsSkeleton(),
  [SeeMorePageRoutes.FavoritesMoviesPage]: generateCardsSkeleton(),
  [SeeMorePageRoutes.FavoritesSerialsPage]: generateCardsSkeleton(),
  [SeeMorePageRoutes.HistoryMovies]: generateCardsSkeleton(),
  [SeeMorePageRoutes.HorrorMovies]: generateCardsSkeleton(),
  [SeeMorePageRoutes.NowPlaying]: generateCardsSkeleton(),
  [SeeMorePageRoutes.Popular]: generateCardsSkeleton(),
  [SeeMorePageRoutes.PopularSerials]: generateCardsSkeleton(),
  [SeeMorePageRoutes.SerialsAiringToday]: generateCardsSkeleton(),
  [SeeMorePageRoutes.SerialsOnAir]: generateCardsSkeleton(),
  [SeeMorePageRoutes.ThrillerMovies]: generateCardsSkeleton(),
  [SeeMorePageRoutes.TopRated]: generateCardsSkeleton(),
  [SeeMorePageRoutes.TopRatedSerials]: generateCardsSkeleton(),
  [SeeMorePageRoutes.Trending]: generateCardsSkeleton(),
  [SeeMorePageRoutes.Upcoming]: generateCardsSkeleton(),
  [SeeMorePageRoutes.WarMovies]: generateCardsSkeleton(),
  [SeeMorePageRoutes.WesternMovies]: generateCardsSkeleton(),
};

export const mainLayoutContentBasedOnRoute = {
  ...mainRoutes,
  ...seeMorePageRoutes,
};
