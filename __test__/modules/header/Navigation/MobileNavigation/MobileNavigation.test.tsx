import { screen } from "@testing-library/react";

import {
  mockSessionWithUser,
  withSessionProviderAndReactContext,
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
    withSessionProviderAndReactContext({
      path: AppRoutes.Movies,
      session: mockSessionWithUser,
      component: <MobileNavigation isVisible />,
    });

    expect(screen.getByTestId("mobile-navigation")).toBeInTheDocument();
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Serials/)).toBeInTheDocument();
  });

  it("Should not render MobileNavigation component when isVisible props is false", () => {
    withSessionProviderAndReactContext({
      path: AppRoutes.Movies,
      session: mockSessionWithUser,
      component: <MobileNavigation isVisible={false} />,
    });

    expect(screen.queryByTestId("mobile-navigation")).not.toBeInTheDocument();
  });
});
