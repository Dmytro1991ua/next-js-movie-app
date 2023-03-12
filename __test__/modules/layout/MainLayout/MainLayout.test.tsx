import { render, screen } from "@testing-library/react";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";
import * as hooks from "next-auth/react";

import { mockSessionWithNoUser, mockSessionWithUser } from "@/mocks/testMocks";
import { MainLayout } from "@/modules/layout";
import { AppRoutes } from "@/types/enums";

import createMockRouter from "./../../../../mocks/createMockRouter";

describe("MainLayout", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing and Sign-In button and logo if user is not authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <RouterContext.Provider
          value={createMockRouter({ asPath: AppRoutes.SignIn })}
        >
          <MainLayout />
        </RouterContext.Provider>
      </SessionProvider>
    );

    expect(screen.getByText(/Movie/)).toBeInTheDocument();
    expect(screen.getByText(/Room/)).toBeInTheDocument();
    expect(screen.getByAltText(/Popcorn Image/)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/User Avatar/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Home/)).not.toBeInTheDocument();
  });

  it("Should render Sign-Out button, navigation and user avatar when user is authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithUser}>
        <RouterContext.Provider
          value={createMockRouter({ pathname: AppRoutes.Movies })}
        >
          <MainLayout />
        </RouterContext.Provider>
      </SessionProvider>
    );

    expect(screen.getByAltText(/User Avatar/)).toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/)).not.toBeInTheDocument();
  });

  it("Should render Sign-Out button when user is authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithUser}>
        <RouterContext.Provider
          value={createMockRouter({ asPath: AppRoutes.Movies })}
        >
          <MainLayout />
        </RouterContext.Provider>
      </SessionProvider>
    );

    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/)).not.toBeInTheDocument();
  });

  it("Should render Image component when user is not authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <RouterContext.Provider
          value={createMockRouter({ asPath: AppRoutes.SignIn })}
        >
          <MainLayout />
        </RouterContext.Provider>
      </SessionProvider>
    );

    const image = screen.getByTestId("image");

    expect(image).toBeInTheDocument();
  });

  it("Should not render Image component when user is authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithUser}>
        <RouterContext.Provider
          value={createMockRouter({ asPath: AppRoutes.Movies })}
        >
          <MainLayout />
        </RouterContext.Provider>
      </SessionProvider>
    );

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
    const signInSkeleton = screen.getByTestId("sign-skeleton");

    expect(headerSkeleton).toBeInTheDocument();
    expect(signInSkeleton).toBeInTheDocument();
  });
});
