import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { FC, ReactNode, useEffect } from "react";

import { AppRoutes } from "@/types/enums";

import GenerateMainLayoutSkeleton from "../layout/MainLayout/GenerateMainLayoutSkeleton";

interface ProtectedRoutesProps {
  protectedRoutes: string[];
  children?: ReactNode;
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  protectedRoutes,
  children,
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (status !== "loading" && !session?.user && pathIsProtected) {
      router.push(AppRoutes.Movies);
    }
  }, [pathIsProtected, router, session?.user, status]);

  if ((status === "loading" || !session?.user?.id) && pathIsProtected) {
    return <GenerateMainLayoutSkeleton asPath={router.asPath as AppRoutes} />;
  }

  if (status === "loading" && pathIsProtected) {
    return <GenerateMainLayoutSkeleton asPath={router.asPath as AppRoutes} />;
  }

  if (session?.user?.id && !pathIsProtected) {
    return <GenerateMainLayoutSkeleton asPath={router.asPath as AppRoutes} />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
