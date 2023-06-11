import { screen } from "@testing-library/react";

import HeroContent from "@/components/Hero/HeroContent";
import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
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

const defaultProps = {
  title: "Test tile",
  releaseDate: "2023/03/12",
  rating: 6.4,
  initialRatingValue: 6,
  newRatingData: {
    id: 12,
    name: "Test_Movie",
  },
  overview: "Test movie description",
  onDetailsBtnClick: () => jest.fn(),
  onPlayBtnClick: () => jest.fn(),
  newRating: 0,
};

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
      <HeroContent {...defaultProps} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText(/Test tile/)).toBeInTheDocument();
    expect(screen.getByText("2023/03/12,")).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByText(/6.4/)).toBeInTheDocument();
    expect(screen.getByText(/Test movie description/)).toBeInTheDocument();
  });

  it("should display a custom user's rating if newRating value is provided", () => {
    withQueryClientAndSessionProvider(
      <HeroContent {...defaultProps} newRating={6} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText("My Rating:")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
  });
});
