import { screen } from "@testing-library/react";

import {
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import Profile from "@/pages/profile";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Profile", () => {
  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <Profile />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    expect(screen.getByText(/Account Settings/)).toBeInTheDocument();
  });
});
