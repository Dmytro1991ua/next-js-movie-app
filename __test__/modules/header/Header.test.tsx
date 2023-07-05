import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  mockSessionWithNoUser,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import Header from "@/modules/header";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Header", () => {
  it("Should render component without crashing with logo if user is not authenticated", () => {
    withQueryClientAndSessionProvider(
      <Header />,
      mockSessionWithNoUser,
      AppRoutes.SignIn
    );

    expect(screen.getByText(/Movie/)).toBeInTheDocument();
    expect(screen.getByText(/Room/)).toBeInTheDocument();
    expect(screen.getByAltText(/Popcorn Image/)).toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/User Avatar/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Home/)).not.toBeInTheDocument();
  });

  it("Should render Sign-Out button, navigation and user avatar when user is authenticated", () => {
    withQueryClientAndSessionProvider(
      <Header />,
      mockSessionWithUser,
      AppRoutes.SignIn
    );

    expect(screen.getByAltText(/User Avatar/)).toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Movies/)).toBeInTheDocument();
    expect(screen.getByText(/Serials/)).toBeInTheDocument();
    expect(screen.getByText(/Sign Out/)).toBeInTheDocument();
  });

  it("Should redirect to Home page on Logo click", () => {
    withQueryClientAndSessionProvider(
      <Header />,
      mockSessionWithUser,
      AppRoutes.SignIn
    );

    const logo = screen.getByTestId("logo");

    userEvent.click(logo);

    expect(logo).toHaveAttribute("href", AppRoutes.Home);
  });
});
