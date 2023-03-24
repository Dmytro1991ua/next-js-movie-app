import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as hooks from "next-auth/react";
import { SessionProvider } from "next-auth/react";

import createMockRouter from "@/mocks/createMockRouter";
import {
  mockSessionWithNoUser,
  mockSessionWithUser,
  withSessionProviderAndReactContext,
} from "@/mocks/testMocks";
import { MainLayout } from "@/modules/layout";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("MainLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing and logo if user is not authenticated", () => {
    withSessionProviderAndReactContext({
      path: AppRoutes.SignIn,
      session: mockSessionWithNoUser,
      component: <MainLayout />,
    });

    expect(screen.getByText(/Movie/)).toBeInTheDocument();
    expect(screen.getByText(/Room/)).toBeInTheDocument();
    expect(screen.getByAltText(/Popcorn Image/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/User Avatar/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Home/)).not.toBeInTheDocument();
  });

  it("Should render Sign-Out button, navigation and user avatar when user is authenticated", () => {
    withSessionProviderAndReactContext({
      path: AppRoutes.Home,
      session: mockSessionWithUser,
      component: <MainLayout />,
    });

    expect(screen.getByAltText(/User Avatar/)).toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
  });

  it("Should render Sign-Out button when user is authenticated", () => {
    withSessionProviderAndReactContext({
      path: AppRoutes.Home,
      session: mockSessionWithUser,
      component: <MainLayout />,
    });

    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
  });

  it("Should render Image component when user is not authenticated", () => {
    withSessionProviderAndReactContext({
      path: AppRoutes.SignIn,
      session: mockSessionWithNoUser,
      component: <MainLayout />,
    });

    const image = screen.getByTestId("image");

    expect(image).toBeInTheDocument();
  });

  it("Should not render Image component when user is authenticated", () => {
    withSessionProviderAndReactContext({
      path: AppRoutes.Home,
      session: mockSessionWithUser,
      component: <MainLayout />,
    });

    const image = screen.queryByTestId("image");

    expect(image).not.toBeInTheDocument();
  });

  it("Should render a skeleton if session status is loading", () => {
    jest.spyOn(hooks, "useSession").mockImplementation(() => {
      return { data: null, status: "loading" };
    });

    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <RouterContext.Provider
          value={createMockRouter({ asPath: AppRoutes.SignIn })}
        >
          <MainLayout />
        </RouterContext.Provider>
      </SessionProvider>
    );

    const headerSkeleton = screen.getByTestId("header-skeleton");
    const signInSkeleton = screen.getByTestId("sign-in-skeleton");

    expect(headerSkeleton).toBeInTheDocument();
    expect(signInSkeleton).toBeInTheDocument();
  });
});
