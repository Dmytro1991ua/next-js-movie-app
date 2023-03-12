import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";

import createMockRouter from "@/mocks/createMockRouter";
import { mockSessionWithNoUser, mockSessionWithUser } from "@/mocks/testMocks";
import Header from "@/modules/header";
import { AppRoutes } from "@/types/enums";

describe("Header", () => {
  it("Should render component without crashing with Sign-In button and logo if user is not authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <RouterContext.Provider
          value={createMockRouter({ pathname: AppRoutes.SignIn })}
        >
          <Header />
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
          <Header />
        </RouterContext.Provider>
      </SessionProvider>
    );

    expect(screen.getByAltText(/User Avatar/)).toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/)).not.toBeInTheDocument();
  });

  it("Should redirect to Home page on Logo click", () => {
    render(
      <SessionProvider session={mockSessionWithUser}>
        <RouterContext.Provider
          value={createMockRouter({ pathname: AppRoutes.Movies })}
        >
          <Header />
        </RouterContext.Provider>
      </SessionProvider>
    );

    const logo = screen.getByTestId("logo");

    userEvent.click(logo);

    expect(logo).toHaveAttribute("href", AppRoutes.Movies);
  });
});
