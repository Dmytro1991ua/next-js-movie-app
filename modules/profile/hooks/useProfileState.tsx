import { DefaultUser } from "next-auth";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";

import { useUpdateProfileData } from "@/hooks/mutations/useUpdateProfileData";
import { useGetUserAvatar } from "@/hooks/useGetUserAvatar";
import { QueryString } from "@/types/enums";

import { ACCEPTABLE_FILE_IMAGE_TYPES } from "../constants";
import { profileService } from "../profile.service";
import { handleImageDrop } from "../utils";

type HookProps = {
  profileData?: Omit<DefaultUser, "id"> & { password?: string };
};

type ReturnedHookType = {
  previewImage: string | null;
  userAvatar: string;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  onImageUpload: () => void;
  isDragActive: boolean;
};

export const useProfileState = ({
  profileData,
}: HookProps): ReturnedHookType => {
  const { data: session } = useSession();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (file: File[]) => handleImageDrop(file, setPreviewImage),
    multiple: false,
    accept: ACCEPTABLE_FILE_IMAGE_TYPES,
  });

  const { mutate: updateProfileData } = useUpdateProfileData({
    queryKey: QueryString.updateProfileData,
    mutationFn: () => {
      return profileService.uploadProfileData({
        userInfo: {
          ...profileData,
          image: previewImage,
        },
        user: session?.user,
      });
    },
  });

  const { userAvatar } = useGetUserAvatar();

  const onImageUpload = useCallback(() => {
    updateProfileData();
  }, [updateProfileData]);

  return {
    previewImage,
    userAvatar,
    getRootProps,
    getInputProps,
    onImageUpload,
    isDragActive,
  };
};
