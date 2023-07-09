import Button from "@/components/Button";

import { ProfileFormButtonLabel } from "../enums";
import { ProfileFormActionsConfig, ProfileFormActionsProps } from "../types";

const profileFormActionsConfig = ({
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

export const getProfileFormActions = ({
  onCancel,
  onFormReset,
  onSubmit,
  disabled,
  isLoading,
  clickedButtonId,
  onHandleButtonClick,
}: ProfileFormActionsProps) => {
  const config = profileFormActionsConfig({
    onCancel,
    onFormReset,
    onSubmit,
    disabled,
    isLoading,
  });

  return config.map(({ id, label, variant, disabled, isLoading, onClick }) => {
    return (
      <Button
        key={id}
        fullWidth
        disabled={disabled}
        isLoading={isLoading && clickedButtonId === id}
        variant={variant}
        onClick={() => {
          onHandleButtonClick && onHandleButtonClick(id, onClick);
        }}
      >
        {label}
      </Button>
    );
  });
};
