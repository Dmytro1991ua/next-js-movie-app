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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <ProfilePage />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    expect(screen.getByText(/Account Settings/)).toBeInTheDocument();
    expect(screen.getByText(/User Information/)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/)).toBeInTheDocument();
    expect(screen.getByText(/Reset Form/)).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
  });
});
