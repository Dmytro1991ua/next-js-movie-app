import { screen } from "@testing-library/react";

import DetailsPage from "@/components/DetailsPage";
import {
  mockSerialCast,
  mockSerialDetails,
  mockSessionWithUser,
  withSessionProviderAndReactContext,
} from "@/mocks/testMocks";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("DetailsPage", () => {
  it("Should render component without crashing", () => {
    withSessionProviderAndReactContext({
      path: AppRoutes.SerialDetails,
      session: mockSessionWithUser,
      component: (
        <DetailsPage
          movieOrSerialCast={mockSerialCast}
          movieOrSerialDetails={mockSerialDetails}
        />
      ),
    });

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/Breaking Bad/)).toBeInTheDocument();
    expect(screen.getByText(/Remember my name/)).toBeInTheDocument();
    expect(screen.getByText(/First Air Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Last Air Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Revenue:/)).toBeInTheDocument();
    expect(screen.getByText(/Number of seasons:/)).toBeInTheDocument();
    expect(screen.getByText(/Number of episodes:/)).toBeInTheDocument();
    expect(screen.getByText(/Home Page/)).toBeInTheDocument();
    expect(screen.getByText(/Go Back/)).toBeInTheDocument();
    expect(screen.getByText(/Genres:/)).toBeInTheDocument();
    expect(screen.getByText(/Casts:/)).toBeInTheDocument();
    expect(screen.getByText(/Spoken Languages:/)).toBeInTheDocument();
    expect(screen.getByText(/Production Countries:/)).toBeInTheDocument();
  });
});