import clsx from "clsx";
import React, { FC, useMemo } from "react";

import { FromInputConfig } from "@/types/interfaces";

import { getProfileFormInputConfigs } from "../utils";

interface ProfileFormInputsProps {
  config: FromInputConfig[];
  className?: string;
}

const ProfileFormInputs: FC<ProfileFormInputsProps> = ({
  config,
  className,
}) => {
  const formInputs = useMemo(
    () => getProfileFormInputConfigs(config),
    [config]
  );

  return (
    <div className={clsx("flex flex-col w-full", className)}>{formInputs}</div>
  );
};

export default ProfileFormInputs;
