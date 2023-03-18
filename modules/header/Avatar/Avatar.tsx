import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { FC, useMemo } from "react";

import FallbackImage from "@/components/FallbackImage";
import useScrollPosition from "@/hooks/useScrollPosition";
import { AppRoutes } from "@/types/enums";

import {
  DEFAULT_AVATAR_IMAGE_MEASUREMENT,
  SCROLLED_AVATAR_IMAGE_MEASUREMENT,
} from "./../header.constants";
import { getScrolledImageMeasurements } from "../header.utils";

const Avatar: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { isHeaderScrolled } = useScrollPosition();

  const isRouteActive = router.asPath === AppRoutes.Profile;

  const scrolledAvatarMeasurement = useMemo(
    () =>
      getScrolledImageMeasurements({
        isHeaderScrolled,
        defaultMeasurement: DEFAULT_AVATAR_IMAGE_MEASUREMENT,
        scrolledMeasurement: SCROLLED_AVATAR_IMAGE_MEASUREMENT,
      }),
    [isHeaderScrolled]
  );

  return (
    <Link passHref href={AppRoutes.Profile}>
      <a>
        <FallbackImage
          altText="User Avatar"
          height={scrolledAvatarMeasurement}
          imageUrl={session?.user?.image ?? ""}
          isActive={isRouteActive}
          width={scrolledAvatarMeasurement}
        />
      </a>
    </Link>
  );
};

export default Avatar;
