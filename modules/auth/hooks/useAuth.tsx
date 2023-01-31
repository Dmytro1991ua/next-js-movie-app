import { signIn, signOut } from "next-auth/react";

import { toastService } from "@/services/toast.service";
import { AppRoutes } from "@/types/enums";

interface HookReturnedType {
  onSignInViaGithub: () => Promise<void>;
  onSignInViaGoogle: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

const useAuth = (): HookReturnedType => {
  async function onSignInViaGithub(): Promise<void> {
    try {
      signIn("github", { callbackUrl: AppRoutes.Home });

      toastService.success("Successfully signed in via Github");
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

  return { onSignInViaGithub, onSignInViaGoogle, onSignOut };
};

export default useAuth;
