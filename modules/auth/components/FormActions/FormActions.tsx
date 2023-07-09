import React, { FC, memo, useMemo } from "react";

import Button from "@/components/Button";

import { FormActionConfig, FormActionsProps } from "./../../auth.types";
import { FORM_ACTIONS_CONFIG } from "../../auth.configs";
import FormRedirectLink from "../FormRedirectLink";

const FormActions: FC<FormActionsProps> = ({
  isSignUpForm = false,
  isDisabled,
  isLoading,
  route,
  title,
  onSubmitWithCredentials,
  onSubmitWithGithub,
  onSubmitWithGoogle,
}) => {
  const actionButtonsConfig: FormActionConfig[] = useMemo(
    () =>
      FORM_ACTIONS_CONFIG({
        isSignUpForm,
        onSubmitWithCredentials,
        onSubmitWithGithub,
        onSubmitWithGoogle,
        isLoading,
      }),
    [
      isSignUpForm,
      onSubmitWithCredentials,
      onSubmitWithGithub,
      onSubmitWithGoogle,
      isLoading,
    ]
  );
  return (
    <div className="flex flex-col mt-5">
      {actionButtonsConfig.map((button) => {
        const {
          id,
          label,
          variant,
          className,
          fullWidth,
          icon,
          isLoading,
          onClick,
        } = button;

        return (
          <Button
            key={id}
            className={className}
            disabled={variant === "primary" && isDisabled}
            fullWidth={fullWidth}
            isLoading={isLoading}
            variant={variant}
            onClick={onClick}
          >
            {label} {icon}
          </Button>
        );
      })}
      <FormRedirectLink route={route} title={title} />
    </div>
  );
};

export default memo(FormActions);
