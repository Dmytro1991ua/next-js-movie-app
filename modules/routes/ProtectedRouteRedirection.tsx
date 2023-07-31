import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { FC, ReactNode } from "react";

import { AppRoutes, SeeMorePageRoutes } from "@/types/enums";

import GenerateMainLayoutSkeleton from "../layout/MainLayout/GenerateMainLayoutSkeleton";

interface ProtectedRoutesProps {
  protectedRoutes: string[];
  children?: ReactNode;
}

const ProtectedRouteRedirection: FC<ProtectedRoutesProps> = ({
  protectedRoutes,
  children,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  if ((status === "loading" || !session?.user?.id) && pathIsProtected) {
    return (
      <GenerateMainLayoutSkeleton
        asPath={router.route as AppRoutes | SeeMorePageRoutes}
      />
    );
  }

  if (status === "loading" && pathIsProtected) {
    return (
      <GenerateMainLayoutSkeleton
        asPath={router.route as AppRoutes | SeeMorePageRoutes}
      />
    );
  }

  if (session?.user?.id && !pathIsProtected) {
    return (
      <GenerateMainLayoutSkeleton
        asPath={router.route as AppRoutes | SeeMorePageRoutes}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRouteRedirection;
