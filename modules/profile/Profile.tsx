import clsx from "clsx";
import { FormikProps, useFormik } from "formik";
import { useSession } from "next-auth/react";
import { FC, useCallback, useEffect, useState } from "react";

import { useGetUserAvatar } from "@/hooks/useGetUserAvatar";

import { ProfileContentSubtitle, ProfileContentTitle } from "./enums";
import { useProfileState } from "./hooks/useProfileState";
import ProfileAccountSettings from "./ProfileAccountSettings";
import ProfileChangePasswordSettings from "./ProfileChangePasswordSettings";
import ProfileContentWrapper from "./ProfileContentWrapper/ProfileContentWrapper";
import ProfileFormActions from "./ProfileFormActions";
import {
  PROFILE_FORM_INITIAL_VALUES,
  PROFILE_FORM_VALIDATION,
} from "./ProfileFormInputs/ProfileFormInputs.schema";
import { ProfileFormInitialValues } from "./types";
import { getUpdatedUserName } from "./utils";

const Profile: FC = () => {
  const { data: session } = useSession();

  const { userAvatar } = useGetUserAvatar();

  const [userName, setUserName] = useState<string | null>(null);

  const formikInstance: FormikProps<ProfileFormInitialValues> =
    useFormik<ProfileFormInitialValues>({
      initialValues: PROFILE_FORM_INITIAL_VALUES(userName ?? "", session?.user),
      validationSchema: PROFILE_FORM_VALIDATION,
      enableReinitialize: true,
      onSubmit: () => {
        onProfileUpdate();
      },
    });

  const updateNameField = useCallback(
    (name: string) => {
      formikInstance.setFieldValue("name", name);
    },
    [formikInstance]
  );

  useEffect(() => {
    const updatedName = getUpdatedUserName(
      userAvatar.name,
      session?.user?.name ?? ""
    );

    setUserName((prevName) => {
      if (prevName !== updatedName) {
        updateNameField(updatedName);
      }
      return updatedName;
    });
  }, [userAvatar.name, session?.user?.name, updateNameField]);

  const {
    getInputProps,
    getRootProps,
    previewImage,
    onProfileUpdate,
    onProfileFormCancel,
    onResetForm,
  } = useProfileState({
    avatar: userAvatar.image,
    userName,
    formikInstance,
  });

  const renderProfileAccountSettings = (
    <ProfileContentWrapper
      subtitle={ProfileContentSubtitle.UserInformation}
      title={ProfileContentTitle.AccountSettings}
    >
      <ProfileAccountSettings
        formikInstance={formikInstance}
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        image={userAvatar.image}
        previewImage={previewImage}
      />
    </ProfileContentWrapper>
  );

  const renderProfileChangePasswordSettings = (
    <>
      {session?.user?.isCredentialsProvider && (
        <ProfileContentWrapper
          subtitle={ProfileContentSubtitle.PasswordManagement}
          title={ProfileContentTitle.ChangePasswordSettings}
        >
          <ProfileChangePasswordSettings formikInstance={formikInstance} />
        </ProfileContentWrapper>
      )}
    </>
  );

  return (
    <section
      className={clsx(
        "flex flex-col max-h-[60rem] overflow-auto mx-auto  w-full max-w-[100rem] px-3 py-3",
        [session?.user?.isCredentialsProvider ? "mt-[10rem]" : "mt-[20rem]"]
      )}
    >
      {renderProfileAccountSettings}
      {renderProfileChangePasswordSettings}
      <ProfileFormActions
        disabled={!formikInstance.dirty && !previewImage}
        onCancel={onProfileFormCancel}
        onFormReset={onResetForm}
        onSubmit={formikInstance.submitForm}
      />
    </section>
  );
};

export default Profile;
