import { useRouter } from "next/dist/client/router";
import { signIn, signOut } from "next-auth/react";

import { toastService } from "@/services/toast.service";
import {
  SUCCESSFULLY_CREATED_USER_MESSAGE,
  SUCCESSFULLY_SIGNED_IN_WITH_CREDENTIALS_MESSAGE,
  USERNAME_OR_PASSWORD_DOES_NOT_MATCH_MESSAGE,
  USER_ALREADY_EXIST_MESSAGE,
} from "@/types/constants";
import { AppRoutes } from "@/types/enums";

interface HookReturnedType {
  onSignInViaGithub: () => Promise<void>;
  onSignInViaGoogle: () => Promise<void>;
  onSignInViaEmailAndPAssword: (
    email: string,
    password: string
  ) => Promise<void>;
  onCreateNewUser: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  onSignOut: () => Promise<void>;
}

const useAuth = (): HookReturnedType => {
  const router = useRouter();

  async function onSignInViaGithub(): Promise<void> {
    try {
      signIn("github", { callbackUrl: AppRoutes.Home });

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
        callbackUrl: AppRoutes.Home,
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
    name: string;
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
      signIn("google", { callbackUrl: AppRoutes.Home });

      toastService.success("Successfully signed in via Google");
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  async function onSignOut(): Promise<void> {
    try {
      signOut({ callbackUrl: AppRoutes.SignIn, redirect: false });

      toastService.success("Successfully signed out");
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  return {
    onSignInViaGithub,
    onSignInViaGoogle,
    onSignInViaEmailAndPAssword: onSignInViaEmailAndPassword,
    onCreateNewUser,
    onSignOut,
  };
};

export default useAuth;
