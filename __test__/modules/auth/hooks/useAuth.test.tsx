import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import * as nextAuth from "next-auth/react";

import useAuth from "@/modules/auth/hooks/useAuth";
import { AppRoutes } from "@/types/enums";

describe("useAuth", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const { result } = renderHook(() => useAuth());

  it("Should call onSignInViaGithub", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    await act(() => result.current.onSignInViaGithub());

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("github", {
        callbackUrl: AppRoutes.Home,
      })
    );
  });

  it("Should call onSignInViaGoogle", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    await act(() => result.current.onSignInViaGoogle());

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("google", {
        callbackUrl: AppRoutes.Home,
      })
    );
  });

  it("Should call onSignOut", async () => {
    const signOut = jest.spyOn(nextAuth, "signOut").mockImplementation({
      url: AppRoutes.SignIn,
      redirect: false,
    });

    await act(() => result.current.onSignOut());

    await waitFor(() => expect(signOut).toHaveBeenCalled());
  });
});
