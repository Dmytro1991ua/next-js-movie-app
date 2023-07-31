import { screen } from "@testing-library/react";

import {
  mockSessionWithNoUser,
  withSessionProviderAndReactContext,
} from "@/mocks/testMocks";
import { useNavigationState } from "@/modules/header/hooks/useNavigationState";
import Navigation from "@/modules/header/Navigation";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("@/modules/header/hooks/useNavigationState");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "John Doe", email: "john@doe.com" },
        password: "12456",
      }),
  })
);

describe("Navigation", () => {
  const mockOnToggleMobileNavigation = jest.fn();
  const mockLinks = [
    <p key={1}>Home</p>,
    <p key={2}>Movies</p>,
    <p key={3}>Serials</p>,
  ];

  it("Should render component without crashing", () => {
    (useNavigationState as jest.Mock).mockReturnValue({
      links: mockLinks,
      isMobileMenuShown: false,
      onToggleMobileNavigation: mockOnToggleMobileNavigation,
    });

    withSessionProviderAndReactContext({
      path: AppRoutes.Profile,
      component: <Navigation />,
      session: mockSessionWithNoUser,
    });

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Movies/)).toBeInTheDocument();
    expect(screen.getByText(/Serials/)).toBeInTheDocument();
  });

  it("should render mobile navigation if isVisible true", () => {
    (useNavigationState as jest.Mock).mockReturnValue({
      links: mockLinks,
      isMobileMenuShown: true,
      onToggleMobileNavigation: mockOnToggleMobileNavigation,
    });

    withSessionProviderAndReactContext({
      path: AppRoutes.Profile,
      component: <Navigation />,
      session: mockSessionWithNoUser,
    });

    expect(screen.getByText(/Browse/)).toBeInTheDocument();
  });
});
