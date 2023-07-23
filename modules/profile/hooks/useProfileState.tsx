import { FormikProps } from "formik";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
} from "react-dropzone";

import { useEntityMutationHandler } from "@/hooks/mutations/useEntityMutationHandler";
import { useRedirectStatus } from "@/hooks/useRedirectStatus";
import { QueryString } from "@/types/enums";

import { ACCEPTABLE_FILE_IMAGE_TYPES } from "../constants";
import { profileService } from "../profile.service";
import { ProfileFormInitialValues } from "../types";
import { handleImageDrop } from "../utils";

type HookProps = {
  avatar: string;
  userName: string | null;
  formikInstance: FormikProps<ProfileFormInitialValues>;
};

type ReturnedHookType = {
  previewImage: string | null;
  isLoading: boolean;
  isRedirecting: boolean;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  onProfileUpdate: () => void;
  onProfileFormCancel: () => void;
  onResetForm: () => void;
};

export const useProfileState = ({
  avatar,
  formikInstance,
  userName,
}: HookProps): ReturnedHookType => {
  const { data: session } = useSession();
  const router = useRouter();

  const { values, resetForm } = formikInstance;

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (file: File[]) => handleImageDrop(file, setPreviewImage),
    multiple: false,
    accept: ACCEPTABLE_FILE_IMAGE_TYPES,
  });

  const isRedirecting = useRedirectStatus();

  const { mutate: updateProfileData, isLoading } = useEntityMutationHandler({
    queryKey: QueryString.updateProfileData,
    mutationFn: async () => {
      const response = await profileService.uploadProfileData({
        userInfo: {
          name: values?.name ?? userName,
          image: previewImage ?? avatar,
          password: values?.newPassword,
        },
        user: session?.user,
      });

      return response;
    },
  });

  const onProfileUpdate = useCallback(() => {
    updateProfileData();

    router.back();

    resetForm();
  }, [updateProfileData, router, resetForm]);

  const onProfileFormCancel = useCallback(() => {
    router.back();

    resetForm();
  }, [router, resetForm]);

  const onResetForm = useCallback(() => {
    resetForm();
    setPreviewImage(null);
  }, [resetForm]);

  return {
    previewImage,
    isLoading,
    isRedirecting,
    getRootProps,
    getInputProps,
    onProfileUpdate,
    onProfileFormCancel,
    onResetForm,
  };
};
