import { Form, FormikProvider } from "formik";
import React, { FC } from "react";

import ProfileDropzone from "./ProfileDropzone";
import ProfileImagePreview from "./ProfileImagePreview";
import { PROFILE_ACCOUNT_SETTINGS_CONFIG } from "../configs";
import ProfileFormInputs from "../ProfileFormInputs/ProfileFormInputs";
import { ProfileContent } from "../types";

const ProfileAccountSettings: FC<ProfileContent> = ({
  formikInstance,
  getInputProps,
  getRootProps,
  image,
  previewImage,
}) => {
  return (
    <FormikProvider value={formikInstance}>
      <Form className="flex flex-col items-center sm:flex-row">
        <ProfileDropzone
          getInputProps={getInputProps}
          getRootProps={getRootProps}
        >
          <ProfileImagePreview image={image} previewImage={previewImage} />
        </ProfileDropzone>
        <ProfileFormInputs
          className="mt-3 sm:ml-8 sm:mt-0"
          config={PROFILE_ACCOUNT_SETTINGS_CONFIG}
        />
      </Form>
    </FormikProvider>
  );
};

export default ProfileAccountSettings;
