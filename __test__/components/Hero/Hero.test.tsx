import { screen } from "@testing-library/react";

import Hero from "@/components/Hero";
import {
  RandomMovieOrSerial,
  useGetRandomMovieOrSerial,
} from "@/hooks/useGetRandomMovieOrSerial";
import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import { AppRoutes } from "@/types/enums";

jest.mock("@/hooks/useGetRandomMovieOrSerial");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Hero", () => {
  beforeEach(() => {
    (useGetRandomMovieOrSerial as jest.Mock).mockImplementation(() => ({
      data: mockMovie,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <Hero data={[mockMovie as RandomMovieOrSerial]} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText(/View Details/)).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
