import { Form, FormikProvider } from "formik";
import React, { FC } from "react";

import ProfileFormInputs from "../ProfileFormInputs";
import { PROFILE_CHANGE_PASSWORD_SETTINGS_CONFIG } from "../ProfileFormInputs/config";
import { ProfileContent } from "../types";

const ProfileChangePasswordSettings: FC<
  Pick<ProfileContent, "formikInstance">
> = ({ formikInstance }) => {
  return (
    <FormikProvider value={formikInstance}>
      <Form>
        <ProfileFormInputs config={PROFILE_CHANGE_PASSWORD_SETTINGS_CONFIG} />
      </Form>
    </FormikProvider>
  );
};

export default ProfileChangePasswordSettings;
