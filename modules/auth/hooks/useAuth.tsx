import { FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";

import { AppRoutes, AuthProvider, RequestMethod } from "@/types/enums";
import { getRequestOptions } from "@/utils/utils";

import { authService } from "./../auth.service";
import {
  HookReturnedType,
  LoadingState,
  NewUser,
  SignInFormInitialValues,
  SignUpFormInitialValues,
} from "../auth.types";

const useAuth = (): HookReturnedType => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<LoadingState>({});

  async function onSignInViaGithub(): Promise<void> {
    await authService.loginWithProvider(AuthProvider.GitHub, AppRoutes.Home);
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
    const options = getRequestOptions({
      method: RequestMethod.POST,
      body: JSON.stringify({ name, password, email }),
    });

    await authService.register(options, router);
  }

  async function onSignInViaGoogle(): Promise<void> {
    await authService.loginWithProvider(AuthProvider.Google, AppRoutes.Home);
  }

  async function onSignOut(): Promise<void> {
    await authService.logOut(router);
  }

  async function onSubmitFormWithCredentials(
    values: SignInFormInitialValues,
    helpers: FormikHelpers<SignInFormInitialValues>
  ): Promise<void> {
    setIsLoading((prevLoading) => ({ ...prevLoading, signIn: true }));

    await onSignInViaEmailAndPassword(values.email, values.password);
    setIsLoading((prevLoading) => ({ ...prevLoading, signIn: false }));

    helpers.resetForm({ values });
  }

  async function onSubmitFormAndCreateNewUser(
    values: SignUpFormInitialValues,
    helpers: FormikHelpers<SignUpFormInitialValues>
  ): Promise<void> {
    setIsLoading((prevLoading) => ({ ...prevLoading, signUp: true }));

    const { name, email, password } = values;

    await onCreateNewUser({ name, email, password });
    setIsLoading((prevLoading) => ({ ...prevLoading, signUp: false }));

    helpers.resetForm({ values });
  }

  function onSubmitFormViaGithub(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();

    setIsLoading((prevLoading) => ({ ...prevLoading, github: true }));

    onSignInViaGithub();

    setIsLoading((prevLoading) => ({ ...prevLoading, github: false }));
  }

  function onSubmitFormViaGoogle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    setIsLoading((prevLoading) => ({ ...prevLoading, google: true }));

    onSignInViaGoogle();

    setIsLoading((prevLoading) => ({ ...prevLoading, google: false }));
  }

  return {
    isLoading,
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
