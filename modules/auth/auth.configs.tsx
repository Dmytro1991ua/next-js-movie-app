import { FcGoogle } from "react-icons/fc";
import { MdAttachEmail } from "react-icons/md";
import { RxGithubLogo } from "react-icons/rx";
import { v4 as uuidv4 } from "uuid";

import { FromInputConfig } from "@/types/interfaces";

import { FormActionsLabel } from "./auth.enums";
import { FormActionConfig, FormActionConfigProps } from "./auth.types";

export const SIGN_IN_FORM_INPUTS_CONFIG: FromInputConfig[] = [
  {
    id: uuidv4(),
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    fullWidth: true,
    label: "Email",
  },
  {
    id: uuidv4(),
    name: "password",
    placeholder: "Enter your password",
    type: "password",
    fullWidth: true,
    label: "Password",
  },
];

export const SIGN_UP_FORM_INPUTS_CONFIG: FromInputConfig[] = [
  {
    id: uuidv4(),
    name: "name",
    placeholder: "Enter your name",
    fullWidth: true,
  },
  ...SIGN_IN_FORM_INPUTS_CONFIG.map((input) => ({
    ...input,
    label: "",
  })),
  {
    id: uuidv4(),
    name: "confirmedPassword",
    placeholder: "Confirm the password",
    type: "password",
    fullWidth: true,
  },
];

export const FORM_ACTIONS_CONFIG = ({
  isSignUpForm,
  isLoading,
  onSubmitWithCredentials,
  onSubmitWithGithub,
  onSubmitWithGoogle,
}: FormActionConfigProps): FormActionConfig[] => {
  const credentialsButtonIcon = <MdAttachEmail className="ml-4 text-2xl" />;

  const signInWithCredentialsConfig: FormActionConfig[] = [
    {
      id: FormActionsLabel.SignUp,
      label: FormActionsLabel.SignUp,
      variant: "primary",
      className: "mb-3",
      fullWidth: true,
      isLoading: isLoading?.signUp,
      icon: credentialsButtonIcon,
      onClick: onSubmitWithCredentials,
    },
  ];

  if (isSignUpForm) {
    return signInWithCredentialsConfig;
  }

  return [
    {
      id: FormActionsLabel.SignInWithCredentials,
      label: FormActionsLabel.SignInWithCredentials,
      variant: "primary",
      className: "mb-3",
      fullWidth: true,
      isLoading: isLoading?.signIn,
      icon: credentialsButtonIcon,
      onClick: onSubmitWithCredentials,
    },
    {
      id: FormActionsLabel.SignInWithGithub,
      label: FormActionsLabel.SignInWithGithub,
      variant: "secondary",
      className: "mb-3",
      fullWidth: true,
      isLoading: isLoading?.github,
      icon: <RxGithubLogo className="ml-4 text-2xl" />,
      onClick: onSubmitWithGithub,
    },
    {
      id: FormActionsLabel.SignInWithGoogle,
      label: FormActionsLabel.SignInWithGoogle,
      variant: "tertiary",
      className: "mb-3",
      isLoading: isLoading?.google,
      icon: <FcGoogle className="ml-4 text-2xl" />,
      fullWidth: true,
      onClick: onSubmitWithGoogle,
    },
  ];
};
