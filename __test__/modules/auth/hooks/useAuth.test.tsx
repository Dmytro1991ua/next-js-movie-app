import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import * as nextAuth from "next-auth/react";
import { toast } from "react-toastify";

import useAuth from "@/modules/auth/hooks/useAuth";
import { AppRoutes } from "@/types/enums";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

describe("useAuth", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            user: { name: "John Doe", email: "john@doe.com" },
            password: "12456",
          }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  const { result } = renderHook(() => useAuth());

  it("Should call onSignInViaGithub", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    try {
      await act(() => result.current.onSignInViaGithub());

      await waitFor(() =>
        expect(signIn).toHaveBeenCalledWith("github", {
          callbackUrl: AppRoutes.Home,
        })
      );

      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });

  it("Should call onSignInViaGoogle", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    try {
      await act(() => result.current.onSignInViaGoogle());

      await waitFor(() =>
        expect(signIn).toHaveBeenCalledWith("google", {
          callbackUrl: AppRoutes.Home,
        })
      );

      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });

  it("Should call onSignInViaEmailAndPAssword", async () => {
    const mockEmail = "test@example.com";
    const mockPassword = "123456";

    const signIn = jest.spyOn(nextAuth, "signIn");

    try {
      await act(() =>
        result.current.onSignInViaEmailAndPAssword(mockEmail, mockPassword)
      );

      await waitFor(() =>
        expect(signIn).toHaveBeenCalledWith("credentials", {
          callbackUrl: AppRoutes.Home,
          redirect: false,
          email: mockEmail,
          password: mockPassword,
        })
      );

      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });

  it("Should call onCreateNewUser", async () => {
    const mockName = "John Doe";
    const mockEmail = "test@example.com";
    const mockPassword = "123456";

    try {
      const data = await result.current.onCreateNewUser({
        name: mockName,
        email: mockEmail,
        password: mockPassword,
      });

      await waitFor(() =>
        expect(data).toBe({
          name: mockName,
          email: mockEmail,
          password: mockPassword,
        })
      );
      expect(fetch).toHaveBeenCalledTimes(1);

      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });

  it("Should call onSignOut", async () => {
    const signOut = jest.spyOn(nextAuth, "signOut").mockImplementation({
      url: AppRoutes.SignIn,
      redirect: false,
    });

    try {
      await act(() => result.current.onSignOut());
      await waitFor(() => expect(signOut).toHaveBeenCalled());
      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });
});
