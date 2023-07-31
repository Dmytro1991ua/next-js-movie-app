import { screen } from "@testing-library/react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import {
  mockSessionWithUser,
  withSessionProviderAndReactContext,
} from "@/mocks/testMocks";
import ProtectedRouteRedirection from "@/modules/routes/ProtectedRouteRedirection";
import { AppRoutes } from "@/types/enums";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  ...jest.requireActual("next-auth/react"),
  useSession: jest.fn(),
}));

describe("ProtectedRouteRedirection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show the skeleton when session is loading and the route is protected", () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: AppRoutes.Profile,
      route: AppRoutes.Profile,
    });
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
    });

    withSessionProviderAndReactContext({
      component: (
        <ProtectedRouteRedirection protectedRoutes={[AppRoutes.Profile]}>
          <p>Protected Content</p>
        </ProtectedRouteRedirection>
      ),
      path: AppRoutes.Profile,
      session: mockSessionWithUser,
    });

    expect(screen.getByTestId("main-layout-skeleton")).toBeInTheDocument();
  });

  it("should show the skeleton when session is loading and the route is not protected", () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: AppRoutes.SignIn,
      route: AppRoutes.SignIn,
    });
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "loading",
    });

    withSessionProviderAndReactContext({
      component: (
        <ProtectedRouteRedirection protectedRoutes={[AppRoutes.Profile]}>
          <p>Protected Content</p>
        </ProtectedRouteRedirection>
      ),
      path: AppRoutes.Profile,
      session: mockSessionWithUser,
    });

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("should show the skeleton when the user is logged in, and the route is not protected", () => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: AppRoutes.SignIn,
      route: AppRoutes.SignIn,
    });
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { id: "someUserId" } },
      status: "success",
    });

    withSessionProviderAndReactContext({
      component: (
        <ProtectedRouteRedirection protectedRoutes={[AppRoutes.Profile]}>
          <p>Protected Content</p>
        </ProtectedRouteRedirection>
      ),
      path: AppRoutes.Profile,
      session: mockSessionWithUser,
    });

    expect(screen.getByTestId("main-layout-skeleton")).toBeInTheDocument();
  });
});
