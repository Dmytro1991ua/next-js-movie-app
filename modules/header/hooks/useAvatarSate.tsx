import { useRouter } from "next/router";
import { useMemo } from "react";

import { useGetUserAvatar } from "@/hooks/useGetUserAvatar";
import useScrollPosition from "@/hooks/useScrollPosition";
import { AppRoutes } from "@/types/enums";

import {
  DEFAULT_AVATAR_IMAGE_MEASUREMENT,
  SCROLLED_AVATAR_IMAGE_MEASUREMENT,
} from "../header.constants";
import { getScrolledImageMeasurements } from "../header.utils";

type ReturnedHookType = {
  isRouteActive: boolean;
  userAvatar: {
    image: string;
    name: string;
  };
  scrolledAvatarMeasurement: string;
};

export const useAvatarState = (): ReturnedHookType => {
  const router = useRouter();

  const { isHeaderScrolled } = useScrollPosition();
  const { userAvatar } = useGetUserAvatar();

  const isRouteActive = useMemo(
    () => router.asPath === AppRoutes.Profile,
    [router.asPath]
  );

  const scrolledAvatarMeasurement = useMemo(
    () =>
      getScrolledImageMeasurements({
        isHeaderScrolled,
        defaultMeasurement: DEFAULT_AVATAR_IMAGE_MEASUREMENT,
        scrolledMeasurement: SCROLLED_AVATAR_IMAGE_MEASUREMENT,
      }),
    [isHeaderScrolled]
  );

  return { isRouteActive, userAvatar, scrolledAvatarMeasurement };
};
