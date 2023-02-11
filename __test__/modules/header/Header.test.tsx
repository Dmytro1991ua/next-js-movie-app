import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";

import createMockRouter from "@/mocks/createMockRouter";
import Header from "@/modules/header/Header";
import { AppRoutes } from "@/types/enums";

export const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { name: "Test user", email: "test@example.com", id: "1" },
};

describe("Header", () => {
  it("Should render component without crashing and Sign-In button if user is not authenticated", () => {
    render(
      <SessionProvider>
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
      <SessionProvider session={mockSession}>
        <Header />
      </SessionProvider>
    );

    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/)).not.toBeInTheDocument();
  });

  it("Should redirect to Home page on Logo click", () => {
    render(
      <SessionProvider>
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
