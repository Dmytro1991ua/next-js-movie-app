import { FormikHelpers } from "formik";

import { ButtonVariant } from "@/components/Button/Button.types";

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

export interface FromInputConfig {
  fullWidth?: boolean;
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  label?: string;
}

export type ButtonClick = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
) => void | Promise<void>;

export interface FormActionConfig {
  id: string;
  label: string;
  variant: ButtonVariant;
  fullWidth?: boolean;
  className?: string;
  onClick?: ButtonClick;
}

export interface FormActionConfigProps {
  isSignUpForm?: boolean;
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
}

export interface HookReturnedType {
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
