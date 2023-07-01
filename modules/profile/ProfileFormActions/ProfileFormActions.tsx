import React, { FC, useMemo } from "react";

import { getProfileFormActions } from "./config";
import { ProfileFormActionsProps } from "../types";

const ProfileFormActions: FC<ProfileFormActionsProps> = ({
  onCancel,
  onFormReset,
  onSubmit,
  disabled,
}: ProfileFormActionsProps) => {
  const formActions = useMemo(
    () => getProfileFormActions({ onCancel, onFormReset, onSubmit, disabled }),
    [onCancel, onFormReset, onSubmit, disabled]
  );

  return (
    <div className="flex flex-col sm:flex-row w-full gap-2 justify-between">
      {formActions}
    </div>
  );
};

export default ProfileFormActions;
