import { act, render, screen, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";
import * as nextAuth from "next-auth/react";
import { toast } from "react-toastify";

import createMockRouter from "@/mocks/createMockRouter";
import { mockSessionWithNoUser, mockSessionWithUser } from "@/mocks/testMocks";
import useAuth from "@/modules/auth/hooks/useAuth";
import Navigation from "@/modules/header/Navigation";
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

describe("Navigation", () => {
  const { result } = renderHook(() => useAuth());

  it("Should render component without crashing and Sign-In button if user is not authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Navigation />
      </SessionProvider>
    );

    expect(screen.getByText(/Profile/)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/)).not.toBeInTheDocument();
  });

  it("Should render Sign-Out button when user is authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithUser}>
        <Navigation />
      </SessionProvider>
    );

    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/)).not.toBeInTheDocument();
  });

  it("Should redirect to Profile page on Logo click", async () => {
    render(
      <SessionProvider session={mockSessionWithUser}>
        <RouterContext.Provider
          value={createMockRouter({ pathname: AppRoutes.Profile })}
        >
          <Navigation />
        </RouterContext.Provider>
      </SessionProvider>
    );

    const profileBtn = screen.getByText(/Profile/);

    userEvent.click(profileBtn);

    await waitFor(() =>
      expect(profileBtn).toHaveAttribute("href", AppRoutes.Profile)
    );
  });

  it("Should call onSignOut method on Sign Out button click", async () => {
    const signOut = jest.spyOn(nextAuth, "signOut").mockImplementation({
      url: AppRoutes.SignIn,
      redirect: false,
    });

    render(
      <SessionProvider session={mockSessionWithUser}>
        <Navigation />
      </SessionProvider>
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

  it("Should call onSignOut method on Sign Out button click", async () => {
    const signIn = jest.spyOn(nextAuth, "signIn");

    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Navigation />
      </SessionProvider>
    );

    const signInBtn = screen.getByText(/Sign In/);

    userEvent.click(signInBtn);

    await waitFor(() => expect(signIn).toHaveBeenCalled());
  });
});
