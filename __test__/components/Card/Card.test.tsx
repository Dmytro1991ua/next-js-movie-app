import { screen } from "@testing-library/react";

import Card from "@/components/Card/Card";
import {
  mockSerialDetails,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import { AppRoutes } from "@/types/enums";
import { MovieOrSerialResults } from "@/types/interfaces";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Card", () => {
  it("should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <Card
        movieOrSerialData={mockSerialDetails as unknown as MovieOrSerialResults}
        route={AppRoutes.Home}
      />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("See Details")).toBeInTheDocument();
  });
});
