import { FormikHelpers } from "formik";
import { useRouter } from "next/dist/client/router";
import { signIn, signOut } from "next-auth/react";
import fetch from "node-fetch";

import {
  SIGN_UP_SUCCESSFUL_MESSAGE,
  SUCCESSFULLY_CREATED_USER_MESSAGE,
  SUCCESSFULLY_SIGNED_IN_WITH_CREDENTIALS_MESSAGE,
  USERNAME_OR_PASSWORD_DOES_NOT_MATCH_MESSAGE,
  USER_ALREADY_EXIST_MESSAGE,
} from "@/modules/auth/auth.constants";
import { toastService } from "@/services/toast.service";
import { AppRoutes } from "@/types/enums";

import {
  HookReturnedType,
  SignInFormInitialValues,
  SignUpFormInitialValues,
} from "../auth.types";

const useAuth = (): HookReturnedType => {
  const router = useRouter();

  async function onSignInViaGithub(): Promise<void> {
    try {
      signIn("github", { callbackUrl: AppRoutes.Movies });

      toastService.success("Successfully signed in via Github");
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  async function onSignInViaEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      const loginStatus = await signIn("credentials", {
        email,
        password,
        callbackUrl: AppRoutes.Movies,
        redirect: false,
      });

      if (loginStatus?.ok) {
        router.push(loginStatus.url as AppRoutes);
        toastService.success(SUCCESSFULLY_SIGNED_IN_WITH_CREDENTIALS_MESSAGE);
      } else {
        toastService.error(USERNAME_OR_PASSWORD_DOES_NOT_MATCH_MESSAGE);
      }
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  async function onCreateNewUser({
    name,
    email,
    password,
  }: {
    name?: string;
    email: string;
    password: string;
  }): Promise<void> {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, email }),
    };

    try {
      const response = await fetch(`/api/auth/sign-up`, options);

      const data = await response.json();

      if (data.message === USER_ALREADY_EXIST_MESSAGE) {
        toastService.warn(USER_ALREADY_EXIST_MESSAGE);
      } else {
        router.push(AppRoutes.SignIn);
        toastService.success(SUCCESSFULLY_CREATED_USER_MESSAGE);
      }
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  async function onSignInViaGoogle(): Promise<void> {
    try {
      signIn("google", { callbackUrl: AppRoutes.Movies });

      toastService.success("Successfully signed in via Google");
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  async function onSignOut(): Promise<void> {
    try {
      const data = await signOut({
        callbackUrl: AppRoutes.SignIn,
        redirect: false,
      });

      if (data.url) {
        router.push(data.url);
        toastService.success(SIGN_UP_SUCCESSFUL_MESSAGE);
      }
    } catch (err) {
      toastService.error((err as Error).message);
    }
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
