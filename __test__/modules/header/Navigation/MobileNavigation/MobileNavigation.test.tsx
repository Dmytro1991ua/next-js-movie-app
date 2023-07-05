import { screen } from "@testing-library/react";

import {
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import MobileNavigation from "@/modules/header/Navigation/MobileNavigation";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "John Doe", email: "john@doe.com" },
        password: "12456",
      }),
  })
);

describe("MobileNavigation", () => {
  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <MobileNavigation isVisible />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByTestId("mobile-navigation")).toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Movies/)).toBeInTheDocument();
    expect(screen.getByText(/Serials/)).toBeInTheDocument();
  });

  it("Should not render MobileNavigation component when isVisible props is false", () => {
    withQueryClientAndSessionProvider(
      <MobileNavigation isVisible={false} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.queryByTestId("mobile-navigation")).not.toBeInTheDocument();
  });
});
