import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";

import createMockRouter from "@/mocks/createMockRouter";
import { mockSessionWithNoUser, mockSessionWithUser } from "@/mocks/testMocks";
import Header from "@/modules/header";
import { AppRoutes } from "@/types/enums";

describe("Header", () => {
  it("Should render component without crashing and Sign-In button if user is not authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <Header />
      </SessionProvider>
    );

    expect(screen.getByText(/MovieTime/)).toBeInTheDocument();
    expect(screen.getByText(/Profile/)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/)).not.toBeInTheDocument();
  });

  it("Should render Sign-Out button when user is authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithUser}>
        <Header />
      </SessionProvider>
    );

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

    const logo = screen.getByText(/MovieTime/);

    userEvent.click(logo);

    expect(logo).toHaveAttribute("href", AppRoutes.Movies);
  });
});
