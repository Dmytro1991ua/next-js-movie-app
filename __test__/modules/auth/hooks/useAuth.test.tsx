import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import * as nextAuth from "next-auth/react";

import { MOCK_FORMIK_INSTANCE } from "@/mocks/testMocks";
import { AuthProvider } from "@/modules/auth/auth.enums";
import { SIGN_IN_FORM_INITIAL_VALUE } from "@/modules/auth/components/SignIn/SignIn.schema";
import { SIGN_UP_FORM_INITIAL_VALUE } from "@/modules/auth/components/SignUp/SignUp.schema";
import useAuth from "@/modules/auth/hooks/useAuth";
import { AppRoutes } from "@/types/enums";

import { authService } from "./../../../../modules/auth/auth.service";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "John Doe", email: "john@doe.com" },
        password: "12456",
      }),
  })
);

const mockName = "John Doe";
const mockEmail = "test@example.com";
const mockPassword = "123456";
const mockEvent = {
  preventDefault: jest.fn(),
};

describe("useAuth", () => {
  const { result } = renderHook(() => useAuth());

  beforeEach(() => {
    jest.spyOn(mockEvent, "preventDefault");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call onSignInViaGithub", async () => {
    const signIn = jest.spyOn(authService, "loginWithProvider");

    await act(() => result.current.onSignInViaGithub());

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith(AuthProvider.GitHub, AppRoutes.Home)
    );
  });

  it("Should call onSignInViaGoogle", async () => {
    const signIn = jest.spyOn(authService, "loginWithProvider");

    await act(() => result.current.onSignInViaGoogle());

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith(AuthProvider.Google, AppRoutes.Home)
    );
  });

  it("Should call onSignInViaEmailAndPassword", async () => {
    const signIn = jest.spyOn(authService, "loginWithCredentials");

    await act(() =>
      result.current.onSignInViaEmailAndPassword(mockEmail, mockPassword)
    );

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("test@example.com", "123456", null)
    );
  });

  it("Should call onCreateNewUser", async () => {
    const signIn = jest.spyOn(authService, "register");

    const mockRequestOption = {
      body: '{"name":"John Doe","password":"123456","email":"test@example.com"}',
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    };

    await act(() =>
      result.current.onCreateNewUser({
        name: mockName,
        email: mockEmail,
        password: mockPassword,
      })
    );

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith(mockRequestOption, null)
    );
  });

  it("Should call onSignOut", async () => {
    const signOut = jest.spyOn(authService, "logOut");

    await act(() => result.current.onSignOut());
    await waitFor(() => expect(signOut).toHaveBeenCalled());
  });

  it("Should call onSubmitFormWithCredentials method", async () => {
    await act(() =>
      result.current.onSubmitFormWithCredentials(
        SIGN_IN_FORM_INITIAL_VALUE,
        MOCK_FORMIK_INSTANCE.formikInstance
      )
    );

    await waitFor(() =>
      result.current.onSignInViaEmailAndPassword(mockEmail, mockPassword)
    );
    expect(MOCK_FORMIK_INSTANCE.formikInstance.resetForm).toHaveBeenCalled();
  });

  it("Should call onSubmitFormAndCreateNewUser method", async () => {
    await act(() =>
      result.current.onSubmitFormAndCreateNewUser(
        SIGN_UP_FORM_INITIAL_VALUE,
        MOCK_FORMIK_INSTANCE.formikInstance
      )
    );

    await waitFor(() =>
      result.current.onCreateNewUser({
        name: mockName,
        email: mockEmail,
        password: mockPassword,
      })
    );
    expect(MOCK_FORMIK_INSTANCE.formikInstance.resetForm).toHaveBeenCalled();
  });

  it("Should call onSubmitFormViaGoogle method", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    act(() =>
      result.current.onSubmitFormViaGoogle(
        mockEvent as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>
      )
    );

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    await act(() => result.current.onSignInViaGoogle());
    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("google", {
        callbackUrl: AppRoutes.Home,
      })
    );
  });

  it("Should call onSubmitFormViaGithub method", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    act(() =>
      result.current.onSubmitFormViaGithub(
        mockEvent as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>
      )
    );

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    await act(() => result.current.onSignInViaGithub());
    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("github", {
        callbackUrl: AppRoutes.Home,
      })
    );
  });
});
