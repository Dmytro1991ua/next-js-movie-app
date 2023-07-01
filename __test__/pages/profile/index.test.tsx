import { screen } from "@testing-library/react";

import {
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import ProfilePage from "@/pages/profile/index";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Profile Page", () => {
  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <ProfilePage />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    expect(screen.getByText(/Account Settings/)).toBeInTheDocument();
  });
});
