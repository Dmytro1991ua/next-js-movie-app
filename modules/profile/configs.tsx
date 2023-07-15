import { v4 as uuidv4 } from "uuid";

import { FromInputConfig } from "@/types/interfaces";

import { ProfileFormButtonLabel } from "./enums";
import { ProfileFormActionsConfig, ProfileFormActionsProps } from "./types";

export const PROFILE_ACCOUNT_SETTINGS_CONFIG: FromInputConfig[] = [
  {
    id: uuidv4(),
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    fullWidth: true,
    disabled: true,
  },
  {
    id: uuidv4(),
    name: "name",
    placeholder: "Enter your name",
    fullWidth: true,
  },
];

export const PROFILE_CHANGE_PASSWORD_SETTINGS_CONFIG: FromInputConfig[] = [
  {
    id: uuidv4(),
    name: "currentPassword",
    placeholder: "Enter your current password",
    type: "password",
    fullWidth: true,
  },
  {
    id: uuidv4(),
    name: "newPassword",
    placeholder: "Enter your new password",
    type: "password",
    fullWidth: true,
  },
  {
    id: uuidv4(),
    name: "confirmedPassword",
    placeholder: "Confirm the password",
    type: "password",
    fullWidth: true,
  },
];

export const profileFormActionsConfig = ({
  onCancel,
  onFormReset,
  onSubmit,
  disabled,
  isLoading,
}: ProfileFormActionsProps): ProfileFormActionsConfig[] => {
  return [
    {
      id: ProfileFormButtonLabel.Cancel,
      label: ProfileFormButtonLabel.Cancel,
      variant: "danger",
      disabled: false,
      onClick: onCancel,
      isLoading,
    },
    {
      id: ProfileFormButtonLabel.ResetForm,
      label: ProfileFormButtonLabel.ResetForm,
      variant: "secondary",
      disabled,
      onClick: onFormReset,
      isLoading,
    },
    {
      id: ProfileFormButtonLabel.Submit,
      label: ProfileFormButtonLabel.Submit,
      variant: "primary",
      disabled,
      onClick: onSubmit,
      isLoading,
    },
  ];
};
