import React, { FC, useMemo } from "react";

import { useButtonAction } from "@/hooks/useButtonAction";

import { getProfileFormActions } from "./config";
import { ProfileFormActionsProps } from "../types";

const ProfileFormActions: FC<ProfileFormActionsProps> = ({
  onCancel,
  onFormReset,
  onSubmit,
  disabled,
  isLoading,
}: ProfileFormActionsProps) => {
  const { clickedButtonId, onHandleButtonClick } = useButtonAction();

  const formActions = useMemo(
    () =>
      getProfileFormActions({
        onCancel,
        onFormReset,
        onSubmit,
        disabled,
        isLoading,
        clickedButtonId,
        onHandleButtonClick,
      }),
    [
      onCancel,
      onFormReset,
      onSubmit,
      disabled,
      isLoading,
      clickedButtonId,
      onHandleButtonClick,
    ]
  );

  return (
    <div className="flex flex-col sm:flex-row w-full gap-2 justify-between">
      {formActions}
    </div>
  );
};

export default ProfileFormActions;
