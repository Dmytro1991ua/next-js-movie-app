import { act, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import * as nextAuth from "next-auth/react";
import { toast } from "react-toastify";

import {
  mockSessionWithNoUser,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import useAuth from "@/modules/auth/hooks/useAuth";
import Actions from "@/modules/header/Actions";
import { AppRoutes } from "@/types/enums";

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

describe("Navigation", () => {
  const { result } = renderHook(() => useAuth());

  it("Should render component without crashing if user is not authenticated", () => {
    withQueryClientAndSessionProvider(
      <Actions />,
      mockSessionWithNoUser,
      AppRoutes.SignIn
    );

    expect(screen.queryByText(/Sign Out/)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/User Avatar/)).not.toBeInTheDocument();
  });

  it("Should render Sign-Out button when user is authenticated", () => {
    withQueryClientAndSessionProvider(
      <Actions />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByAltText(/User Avatar/)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
  });

  it("Should redirect to Profile page on user avatar click", async () => {
    withQueryClientAndSessionProvider(
      <Actions />,
      mockSessionWithUser,
      AppRoutes.Profile
    );
    const userAvatar = screen.getByRole("link");

    userEvent.click(userAvatar);

    await waitFor(() =>
      expect(userAvatar).toHaveAttribute("href", AppRoutes.Profile)
    );
  });

  it("Should call onSignOut method on Sign Out button click", async () => {
    const signOut = jest.spyOn(nextAuth, "signOut").mockImplementation({
      url: AppRoutes.SignIn,
      redirect: false,
    });

    withQueryClientAndSessionProvider(
      <Actions />,
      mockSessionWithUser,
      AppRoutes.SignIn
    );

    const signOutBtn = screen.getByText(/Sign Out/);

    userEvent.click(signOutBtn);

    try {
      await act(() => result.current.onSignOut());
      await waitFor(() => expect(signOut).toHaveBeenCalled());
      await waitFor(() => expect(toast.success).toHaveBeenCalled());
    } catch {
      await waitFor(() => expect(toast.error).toHaveBeenCalled());
    }
  });

  it("Should have a secondary styles applied to SignOut button on mobile screen", () => {
    withQueryClientAndSessionProvider(
      <Actions isMobileScreen />,
      mockSessionWithUser,
      AppRoutes.SignIn
    );

    const signOutBtn = screen.getByText(/Sign Out/);

    expect(signOutBtn).toHaveClass(
      "bg-lighterBlue hover:bg-blue focus:ring-2 focus:ring-lighterBlue"
    );
  });
});
