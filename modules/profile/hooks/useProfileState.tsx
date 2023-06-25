import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";

import { useUpdateProfileData } from "@/hooks/mutations/useUpdateProfileData";
import { AppRoutes, QueryString } from "@/types/enums";

import { ACCEPTABLE_FILE_IMAGE_TYPES } from "../constants";
import { profileService } from "../profile.service";
import { ProfileFormInitialValues } from "../types";
import { handleImageDrop } from "../utils";

type HookProps = {
  avatar: string;
  profileData?: ProfileFormInitialValues;
};

type ReturnedHookType = {
  previewImage: string | null;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  onImageUpload: () => void;
  isDragActive: boolean;
};

export const useProfileState = ({
  avatar,
  profileData,
}: HookProps): ReturnedHookType => {
  const { data: session } = useSession();
  const router = useRouter();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (file: File[]) => handleImageDrop(file, setPreviewImage),
    multiple: false,
    accept: ACCEPTABLE_FILE_IMAGE_TYPES,
  });

  const { mutate: updateProfileData } = useUpdateProfileData({
    queryKey: QueryString.updateProfileData,
    mutationFn: async () => {
      const response = await profileService.uploadProfileData({
        userInfo: {
          name: profileData?.name,
          image: previewImage ?? avatar,
          password: profileData?.newPassword,
        },
        user: session?.user,
      });

      return response;
    },
  });

  const onImageUpload = useCallback(() => {
    updateProfileData();

    router.push(AppRoutes.Home);
  }, [updateProfileData, router]);

  return {
    previewImage,
    getRootProps,
    getInputProps,
    onImageUpload,
    isDragActive,
  };
};
