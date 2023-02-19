import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

import { mockSessionWithNoUser, mockSessionWithUser } from "@/mocks/testMocks";
import MainLayout from "@/modules/layout/MainLayout";

describe("MainLayout", () => {
  it("Should render component without crashing and Sign-In button if user is not authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
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
      <SessionProvider session={mockSessionWithNoUser}>
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
      <SessionProvider session={mockSessionWithUser}>
        <MainLayout />
      </SessionProvider>
    );

    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign In/)).not.toBeInTheDocument();
  });

  it("Should render Image component when user is not authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithNoUser}>
        <MainLayout />
      </SessionProvider>
    );

    const image = screen.getByTestId("image");

    expect(image).toBeInTheDocument();
  });

  it("Should not render Image component when user is authenticated", () => {
    render(
      <SessionProvider session={mockSessionWithUser}>
        <MainLayout />
      </SessionProvider>
    );

    const image = screen.queryByTestId("image");

    expect(image).not.toBeInTheDocument();
  });
});
