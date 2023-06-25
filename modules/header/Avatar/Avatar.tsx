import Link from "next/link";
import React, { FC } from "react";

import FallbackImage from "@/components/FallbackImage";
import { AppRoutes } from "@/types/enums";

import { useAvatarState } from "../hooks/useAvatarSate";

const Avatar: FC = () => {
  const { userAvatar, isRouteActive, scrolledAvatarMeasurement } =
    useAvatarState();

  return (
    <Link passHref href={AppRoutes.Profile}>
      <a>
        <FallbackImage
          altText="User Avatar"
          height={scrolledAvatarMeasurement}
          imageUrl={userAvatar.image}
          isActive={isRouteActive}
          width={scrolledAvatarMeasurement}
        />
      </a>
    </Link>
  );
};

export default Avatar;
