import { useSession } from "next-auth/react";
import { useMemo } from "react";

import { avatarService } from "@/services/avatar.service";
import { QueryString } from "@/types/enums";
import { GetUserAvatarResult } from "@/types/interfaces";

import { useFetchMoviesOrSerialsData } from "./queries/useFetchMoviesOrSerialsData";

type ReturnedHooType = {
  userAvatar: {
    image: string;
    name: string;
  };
};

export const useGetUserAvatar = (): ReturnedHooType => {
  const { data: session } = useSession();

  const { data: avatar } =
    useFetchMoviesOrSerialsData<GetUserAvatarResult | null>({
      query: QueryString.updateProfileData,
      fetcher: () => avatarService.fetchUserAvatar(session?.user),
      isRefetchOnMount: true,
    });

  const userAvatar = useMemo(() => {
    const image = avatar ? avatar.data.image : session?.user?.image ?? "";
    const name = avatar?.data.name ?? "";

    return { image, name };
  }, [session?.user?.image, avatar]);

  return { userAvatar };
};
