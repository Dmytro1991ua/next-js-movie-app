import { FormikHelpers } from "formik";
import { useRouter } from "next/router";

import { AppRoutes, AuthProvider } from "@/types/enums";

import { authService } from "./../auth.service";
import {
  HookReturnedType,
  NewUser,
  RequestOption,
  SignInFormInitialValues,
  SignUpFormInitialValues,
} from "../auth.types";

const useAuth = (): HookReturnedType => {
  const router = useRouter();

  async function onSignInViaGithub(): Promise<void> {
    await authService.loginWithProvider(AuthProvider.GitHub, AppRoutes.Movies);
  }

  async function onSignInViaEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    await authService.loginWithCredentials(email, password, router);
  }

  async function onCreateNewUser({
    name,
    email,
    password,
  }: NewUser): Promise<void> {
    const options: RequestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, email }),
    };

    await authService.register(options, router);
  }

  async function onSignInViaGoogle(): Promise<void> {
    await authService.loginWithProvider(AuthProvider.Google, AppRoutes.Movies);
  }

  async function onSignOut(): Promise<void> {
    await authService.logOut(router);
  }

  async function onSubmitFormWithCredentials(
    values: SignInFormInitialValues,
    helpers: FormikHelpers<SignInFormInitialValues>
  ): Promise<void> {
    await onSignInViaEmailAndPassword(values.email, values.password);
    helpers.resetForm({ values });
  }

  async function onSubmitFormAndCreateNewUser(
    values: SignUpFormInitialValues,
    helpers: FormikHelpers<SignUpFormInitialValues>
  ): Promise<void> {
    const { name, email, password } = values;

    await onCreateNewUser({ name, email, password });
    helpers.resetForm({ values });
  }

  function onSubmitFormViaGithub(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();

    onSignInViaGithub();
  }

  function onSubmitFormViaGoogle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    onSignInViaGoogle();
  }

  return {
    onSignInViaGithub,
    onSignInViaGoogle,
    onSignInViaEmailAndPassword,
    onCreateNewUser,
    onSignOut,
    onSubmitFormWithCredentials,
    onSubmitFormAndCreateNewUser,
    onSubmitFormViaGithub,
    onSubmitFormViaGoogle,
  };
};

export default useAuth;
