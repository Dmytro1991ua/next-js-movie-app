import clsx from "clsx";
import Link from "next/dist/client/link";
import { useRouter } from "next/dist/client/router";
import React, { FC } from "react";

import { AppRoutes } from "@/types/enums";

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

  return (
    <Link passHref href={url}>
      <a
        className={clsx("relative flex items-center z-10 group", [
          router.asPath === url ? "text-mantis" : "text-white",
          router.asPath === url && isMobileNavigation
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

export default NavigationLink;
