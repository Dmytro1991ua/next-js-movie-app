import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import MainLayout from "@/modules/layout/MainLayout";

export const mockSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { name: "Test user", email: "test@example.com", id: "1" },
};

describe("MainLayout", () => {
  it("Should render component without crashing and Sign-In button if user is not authenticated", () => {
    render(
      <SessionProvider>
        <MainLayout />
      </SessionProvider>
    );

    expect(screen.getByText(/MovieTime/)).toBeInTheDocument();
    expect(screen.getByText(/Profile/)).toBeInTheDocument();
    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/)).not.toBeInTheDocument();
  });

  it("Should render component without crashing and Sign-In button if user is not authenticated", () => {
    render(
      <SessionProvider>
        <MainLayout />
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
        <MainLayout />
      </SessionProvider>
    );

    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/)).not.toBeInTheDocument();
  });
});
