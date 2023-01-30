import { signIn, signOut } from "next-auth/react";

import { toastService } from "@/services/toast.service";
import { AppRoutes } from "@/types/enums";

interface HookReturnedType {
  onSignInViaGithub: () => Promise<void>;
  onSignOut: () => Promise<void>;
}

const useAuth = (): HookReturnedType => {
  async function onSignInViaGithub(): Promise<void> {
    try {
      signIn("github", { callbackUrl: AppRoutes.Home, redirect: false });
      toastService.success("Successfully signed in via Github");
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  async function onSignOut(): Promise<void> {
    try {
      signOut({ callbackUrl: AppRoutes.SignIn, redirect: false });
      toastService.success("Successfully signed out via Github");
    } catch (err) {
      toastService.error((err as Error).message);
    }
  }

  return { onSignInViaGithub, onSignOut };
};

export default useAuth;
