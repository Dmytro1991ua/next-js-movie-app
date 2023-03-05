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
  [AppRoutes.Profile]: <Skeleton />,
  [AppRoutes.Movies]: <Skeleton baseColor="#5a803d" height={500} width={500} />,
  [AppRoutes.Default]: <Skeleton />,
};
