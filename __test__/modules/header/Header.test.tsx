import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import useScrollPosition from "@/hooks/useScrollPosition";
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

jest.mock("@/hooks/useScrollPosition");

describe("Header", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing with logo if user is not authenticated", () => {
    (useScrollPosition as jest.Mock).mockReturnValue({
      isHeaderScrolled: false,
    });

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
    (useScrollPosition as jest.Mock).mockReturnValue({
      isHeaderScrolled: false,
    });

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
    (useScrollPosition as jest.Mock).mockReturnValue({
      isHeaderScrolled: false,
    });

    withQueryClientAndSessionProvider(
      <Header />,
      mockSessionWithUser,
      AppRoutes.SignIn
    );

    const logo = screen.getByTestId("logo");

    userEvent.click(logo);

    expect(logo).toHaveAttribute("href", AppRoutes.Home);
  });

  it("should correctly applied specific styles to a Header when it not scroll", () => {
    (useScrollPosition as jest.Mock).mockReturnValue({
      isHeaderScrolled: false,
    });

    withQueryClientAndSessionProvider(
      <Header />,
      mockSessionWithUser,
      AppRoutes.SignIn
    );

    const header = screen.getByTestId("header");

    expect(header).toHaveClass("header border-0 border-transparent py-4");
  });

  it("should correctly applied specific styles to a Header on scroll", async () => {
    (useScrollPosition as jest.Mock).mockReturnValue({
      isHeaderScrolled: true,
    });

    withQueryClientAndSessionProvider(
      <Header />,
      mockSessionWithUser,
      AppRoutes.SignIn
    );

    const header = screen.getByTestId("header");

    await waitFor(() => expect(header).toHaveClass("header header-on-scroll"));
  });
});
