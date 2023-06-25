import { Form, FormikProps, FormikProvider, useFormik } from "formik";
import { useSession } from "next-auth/react";
import { FC, useMemo } from "react";

import { useGetUserAvatar } from "@/hooks/useGetUserAvatar";

import { useProfileState } from "./hooks/useProfileState";
import ProfileDropzone from "./ProfileDropzone/ProfileDropzone";
import ProfileForm from "./ProfileForm/ProfileForm";
import {
  PROFILE_FORM_INITIAL_VALUES,
  PROFILE_FORM_VALIDATION,
} from "./ProfileForm/ProfileForm.schema";
import ProfileImagePreview from "./ProfileImagePreview/ProfileImagePreview";
import { ProfileFormInitialValues } from "./types";
import { getUpdatedUserName } from "./utils";

const Profile: FC = () => {
  const { data: session } = useSession();

  const { userAvatar } = useGetUserAvatar();

  const userName = useMemo(
    () => getUpdatedUserName(userAvatar.name, session?.user?.name ?? ""),
    [session?.user?.name, userAvatar.name]
  );

  const formikInstance: FormikProps<ProfileFormInitialValues> =
    useFormik<ProfileFormInitialValues>({
      initialValues: PROFILE_FORM_INITIAL_VALUES(userName, session?.user),
      validationSchema: PROFILE_FORM_VALIDATION,
      onSubmit: (_, { resetForm }) => {
        onImageUpload();

        resetForm();
      },
    });

  const {
    getInputProps,
    getRootProps,
    onImageUpload,
    previewImage,
    isDragActive,
  } = useProfileState({
    avatar: userAvatar.image,
    profileData: formikInstance.values,
  });

  return (
    <FormikProvider value={formikInstance}>
      <Form>
        <ProfileDropzone
          getInputProps={getInputProps}
          getRootProps={getRootProps}
          isDragActive={isDragActive}
        >
          <ProfileImagePreview
            image={userAvatar.image}
            previewImage={previewImage}
          />
        </ProfileDropzone>
        <ProfileForm />
        <button type="submit">Upload</button>
      </Form>
    </FormikProvider>
  );
};

export default Profile;
