import { act, waitFor } from "@testing-library/react";
import * as router from "next/router";
import { NextRouter } from "next/router";
import * as nextAuth from "next-auth/react";
import fetch from "node-fetch";
import { toast } from "react-toastify";

import { mockRouter } from "@/mocks/testMocks";
import {
  SIGN_OUT_SUCCESSFUL_MESSAGE,
  SUCCESSFULLY_CREATED_USER_MESSAGE,
  SUCCESSFULLY_SIGNED_IN_WITH_CREDENTIALS_MESSAGE,
  USERNAME_OR_PASSWORD_DOES_NOT_MATCH_MESSAGE,
} from "@/modules/auth/auth.constants";
import { AuthProvider } from "@/modules/auth/auth.enums";
import { authService } from "@/modules/auth/auth.service";
import { RequestOption } from "@/modules/auth/auth.types";
import { AppRoutes } from "@/types/enums";

jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "John Doe", email: "john@doe.com" },
        password: "12456",
      }),
  })
);

describe("AuthService", () => {
  beforeEach(() => {
    jest.spyOn(router, "useRouter");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call loginWithProvider method with GitHub provider", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    try {
      await act(() =>
        authService.loginWithProvider(AuthProvider.GitHub, AppRoutes.Home)
      );

      await waitFor(() =>
        expect(signIn).toHaveBeenCalledWith(AuthProvider.GitHub, {
          callbackUrl: AppRoutes.Home,
        })
      );
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });

  it("Should call loginWithProvider method with Google provider", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    try {
      await act(() =>
        authService.loginWithProvider(AuthProvider.Google, AppRoutes.Home)
      );

      await waitFor(() =>
        expect(signIn).toHaveBeenCalledWith(AuthProvider.Google, {
          callbackUrl: AppRoutes.Home,
        })
      );
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });

  it("Should call loginWithCredentials method and successfully login user with correct credentials", async () => {
    const mockEmail = "xivelit826@wwgoc.com";
    const mockPassword = "@Test12345@";

    const signIn = jest.spyOn(nextAuth, "signIn").mockReturnValue({
      ok: true,
      url: AppRoutes.Home,
    });

    await act(() =>
      authService.loginWithCredentials(
        mockEmail,
        mockPassword,
        mockRouter as unknown as NextRouter
      )
    );

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("credentials", {
        callbackUrl: AppRoutes.Home,
        redirect: false,
        email: mockEmail,
        password: mockPassword,
      })
    );
    await waitFor(() => expect(toast.success).toBeCalledTimes(1));
    await waitFor(() =>
      expect(toast.success).toBeCalledWith(
        SUCCESSFULLY_SIGNED_IN_WITH_CREDENTIALS_MESSAGE
      )
    );
  });

  it("Should call loginWithCredentials method and not login user with wrong credentials", async () => {
    const mockEmail = "john@doe.com";
    const mockPassword = "123456";

    const signIn = jest.spyOn(nextAuth, "signIn").mockReturnValue({
      ok: false,
    });

    await act(() =>
      authService.loginWithCredentials(
        mockEmail,
        mockPassword,
        mockRouter as unknown as NextRouter
      )
    );

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("credentials", {
        callbackUrl: AppRoutes.Home,
        redirect: false,
        email: mockEmail,
        password: mockPassword,
      })
    );
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        USERNAME_OR_PASSWORD_DOES_NOT_MATCH_MESSAGE
      )
    );
  });

  it("Should call register method and create a new user", async () => {
    const mockName = "Alex";
    const mockEmail = "john@doe.com";
    const mockPassword = "123456";

    const options: RequestOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: mockName,
        password: mockPassword,
        email: mockEmail,
      }),
    };

    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(
      new Response(JSON.stringify({ name: mockName }), {
        url: "url",
        status: 200,
        statusText: "OK",
      })
    );

    await act(() =>
      authService.register(options, mockRouter as unknown as NextRouter)
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(
        SUCCESSFULLY_CREATED_USER_MESSAGE
      )
    );
  });

  it("Should call logout method and create a new user", async () => {
    const signOut = jest.spyOn(nextAuth, "signOut").mockReturnValue({
      url: AppRoutes.SignIn,
      ok: true,
    });

    await act(() => authService.logOut(mockRouter as unknown as NextRouter));

    await waitFor(() =>
      expect(signOut).toHaveBeenCalledWith({
        callbackUrl: AppRoutes.SignIn,
        redirect: false,
      })
    );

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith(SIGN_OUT_SUCCESSFUL_MESSAGE)
    );
  });
});
