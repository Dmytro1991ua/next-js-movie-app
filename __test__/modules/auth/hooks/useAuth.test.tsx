import { waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";
import * as nextAuth from "next-auth/react";
import { toast } from "react-toastify";

import { MOCK_FORMIK_INSTANCE } from "@/mocks/testMocks";
import { SIGN_IN_FORM_INITIAL_VALUE } from "@/modules/auth/components/SignIn/SignIn.schema";
import { SIGN_UP_FORM_INITIAL_VALUE } from "@/modules/auth/components/SignUp/SignUp.schema";
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
    const signIn = jest.spyOn(nextAuth, "signIn");

    try {
      await act(() => result.current.onSignInViaGithub());

      await waitFor(() =>
        expect(signIn).toHaveBeenCalledWith("github", {
          callbackUrl: AppRoutes.Movies,
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
          callbackUrl: AppRoutes.Movies,
        })
      );

      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });

  it("Should call onSignInViaEmailAndPassword", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    try {
      await act(() =>
        result.current.onSignInViaEmailAndPassword(mockEmail, mockPassword)
      );

      await waitFor(() =>
        expect(signIn).toHaveBeenCalledWith("credentials", {
          callbackUrl: AppRoutes.Movies,
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
        callbackUrl: AppRoutes.Movies,
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
        callbackUrl: AppRoutes.Movies,
      })
    );
  });
});
