import { v4 as uuidv4 } from "uuid";

import Button from "@/components/Button";

import { ProfileFormButtonLabel } from "../enums";
import { ProfileFormActionsConfig, ProfileFormActionsProps } from "../types";

const profileFormActionsConfig = ({
  onCancel,
  onFormReset,
  onSubmit,
  disabled,
}: ProfileFormActionsProps): ProfileFormActionsConfig[] => {
  return [
    {
      id: uuidv4(),
      label: ProfileFormButtonLabel.Cancel,
      variant: "danger",
      disabled: false,
      onClick: onCancel,
    },
    {
      id: uuidv4(),
      label: ProfileFormButtonLabel.ResetForm,
      variant: "secondary",
      disabled,
      onClick: onFormReset,
    },
    {
      id: uuidv4(),
      label: ProfileFormButtonLabel.Submit,
      variant: "primary",
      disabled,
      onClick: onSubmit,
    },
  ];
};

export const getProfileFormActions = ({
  onCancel,
  onFormReset,
  onSubmit,
  disabled,
}: ProfileFormActionsProps) => {
  const config = profileFormActionsConfig({
    onCancel,
    onFormReset,
    onSubmit,
    disabled,
  });

  return config.map(({ id, label, variant, disabled, onClick }) => (
    <Button
      key={id}
      fullWidth
      disabled={disabled}
      variant={variant}
      onClick={onClick}
    >
      {label}
    </Button>
  ));
};
