import { FormikHelpers } from "formik";

import { ButtonVariant } from "@/components/Button/Button.types";
import { RequestMethod } from "@/types/enums";

import { FormActionsLabel } from "./auth.enums";

export interface SignInFormInitialValues {
  email: string;
  password: string;
}

export interface SignUpFormInitialValues {
  name?: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

export type AuthFormInitialValues =
  | SignInFormInitialValues
  | SignUpFormInitialValues;

export type ButtonClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void | Promise<void>;

export interface FormActionConfig {
  id: FormActionsLabel;
  label: FormActionsLabel;
  variant: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  icon?: JSX.Element;
  isLoading?: boolean;
  onClick?: ButtonClick;
}

export interface FormActionConfigProps {
  isSignUpForm?: boolean;
  isLoading?: LoadingState;
  onSubmitWithCredentials?: () => Promise<void>;
  onSubmitWithGithub?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmitWithGoogle?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export interface FormActionsProps extends FormActionConfigProps {
  route: string;
  title: string;
  isDisabled?: boolean;
  isLoading?: LoadingState;
}

export interface HookReturnedType {
  isLoading?: LoadingState;
  onSignInViaGithub: () => Promise<void>;
  onSignInViaGoogle: () => Promise<void>;
  onSignInViaEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
  onCreateNewUser: ({
    name,
    email,
    password,
  }: {
    name?: string;
    email: string;
    password: string;
  }) => Promise<void>;
  onSignOut: () => Promise<void>;
  onSubmitFormWithCredentials: (
    values: SignInFormInitialValues,
    helpers: FormikHelpers<SignInFormInitialValues>
  ) => Promise<void>;
  onSubmitFormAndCreateNewUser: (
    values: SignUpFormInitialValues,
    helpers: FormikHelpers<SignUpFormInitialValues>
  ) => Promise<void>;
  onSubmitFormViaGithub: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSubmitFormViaGoogle: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export type NewUser = {
  name?: string;
  email: string;
  password: string;
};

export type RequestOption = {
  method: RequestMethod;
  headers: { [key: string]: string };
  body: string;
};

export type LoadingState = {
  [key: string]: boolean;
};
