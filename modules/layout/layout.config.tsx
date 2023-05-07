import Skeleton from "react-loading-skeleton";

import { AppRoutes } from "@/types/enums";

import AuthLayoutSkeleton from "./AuthLayout/AuthLayout.skeleton";
import SignInSkeleton from "../auth/components/SignIn/SignIn.skeleton";
import SignUpSkeleton from "../auth/components/SignUp/SignUp.skeleton";

export const mainLayoutContentBasedOnRoute: Record<AppRoutes, JSX.Element> = {
  [AppRoutes.SignIn]: (
    <>
      <AuthLayoutSkeleton>
        <SignInSkeleton />
      </AuthLayoutSkeleton>
    </>
  ),
  [AppRoutes.SignUp]: (
    <>
      <AuthLayoutSkeleton>
        <SignUpSkeleton />
      </AuthLayoutSkeleton>
    </>
  ),
  [AppRoutes.Profile]: (
    <Skeleton baseColor="#5a803d" height={500} width={500} />
  ),
  [AppRoutes.Home]: <Skeleton baseColor="#5a803d" height={500} width={500} />,
  [AppRoutes.Movies]: <Skeleton baseColor="#5a803d" height={500} width={500} />,
  [AppRoutes.MovieDetails]: (
    <Skeleton baseColor="#5a803d" height={500} width={500} />
  ),
  [AppRoutes.MovieByGenreDetails]: (
    <Skeleton baseColor="#5a803d" height={500} width={500} />
  ),
  [AppRoutes.Serials]: (
    <Skeleton baseColor="#5a803d" height={500} width={500} />
  ),
  [AppRoutes.SerialDetails]: (
    <Skeleton baseColor="#5a803d" height={500} width={500} />
  ),
  [AppRoutes.Default]: <Skeleton />,
};
