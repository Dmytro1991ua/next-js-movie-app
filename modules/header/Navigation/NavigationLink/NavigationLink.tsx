import clsx from "clsx";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import React, { FC, memo, useMemo } from "react";

import { AppRoutes } from "@/types/enums";
import { isRouteActive } from "@/utils/utils";

interface NavigationLinkProps {
  url: AppRoutes;
  icon: JSX.Element;
  label: string;
  isMobileNavigation?: boolean;
}

const NavigationLink: FC<NavigationLinkProps> = ({
  url,
  icon,
  label,
  isMobileNavigation,
}) => {
  const router = useRouter();

  const isNavigationRouteActive = useMemo(
    () =>
      isRouteActive({ asPath: router.asPath, pathname: router.pathname, url }),
    [router.asPath, router.pathname, url]
  );

  return (
    <Link passHref href={url}>
      <a
        className={clsx("relative flex items-center z-10 group", [
          isNavigationRouteActive ? "text-mantis" : "text-white",
          isNavigationRouteActive && isMobileNavigation
            ? "!text-darkBlue"
            : "text-white",
        ])}
        data-testid="nav-icon"
      >
        {icon}
        <h3 className="navigation-link">{label}</h3>
      </a>
    </Link>
  );
};

export default memo(NavigationLink);
