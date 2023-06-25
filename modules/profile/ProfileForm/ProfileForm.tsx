import React, { FC, useMemo } from "react";

import { getProfileFormInputConfigs } from "./configs";

const ProfileForm: FC = () => {
  const formInputs = useMemo(() => getProfileFormInputConfigs(), []);

  return <div>{formInputs}</div>;
};

export default ProfileForm;
