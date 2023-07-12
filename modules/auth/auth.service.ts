import { NextRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import fetch from "node-fetch";

import { toastService } from "@/services/toast.service";
import { AppRoutes } from "@/types/enums";

import {
  SIGN_OUT_SUCCESSFUL_MESSAGE,
  SUCCESSFULLY_CREATED_USER_MESSAGE,
  SUCCESSFULLY_SIGNED_IN_WITH_CREDENTIALS_MESSAGE,
  USERNAME_OR_PASSWORD_DOES_NOT_MATCH_MESSAGE,
  USER_ALREADY_EXIST_MESSAGE,
} from "./auth.constants";
import { AuthProvider } from "./auth.enums";
import { RequestOption } from "./auth.types";

class AuthService {
  async loginWithProvider(providerName: AuthProvider, route: string) {
    try {
      signIn(providerName, { callbackUrl: route });
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  async loginWithCredentials(
    email: string,
    password: string,
    router: NextRouter
  ) {
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

  async register(requestOptions: RequestOption, router: NextRouter) {
    try {
      const response = await fetch(`/api/auth/sign-up`, requestOptions);

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

  async logOut(router: NextRouter) {
    try {
      const data = await signOut({
        callbackUrl: AppRoutes.SignIn,
        redirect: false,
      });

      if (data.url) {
        router.push(data.url);
        toastService.success(SIGN_OUT_SUCCESSFUL_MESSAGE);
      }
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }
}

export const authService = new AuthService();
