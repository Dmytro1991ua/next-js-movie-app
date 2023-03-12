import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { FC } from "react";

import FallbackImage from "@/components/FallbackImage";
import { AppRoutes } from "@/types/enums";

const Avatar: FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Link passHref href={AppRoutes.Profile}>
      <a>
        <FallbackImage
          altText="User Avatar"
          imageUrl={session?.user?.image ?? ""}
          isActive={router.asPath === AppRoutes.Profile}
        />
      </a>
    </Link>
  );
};

export default Avatar;
