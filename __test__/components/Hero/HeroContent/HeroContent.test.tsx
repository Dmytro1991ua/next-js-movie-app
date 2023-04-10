import { render, screen } from "@testing-library/react";

import HeroContent from "@/components/Hero/HeroContent";
import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import { mockMovie } from "@/mocks/testMocks";

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
  overview: "Test movie description",
  onDetailsBtnClick: () => jest.fn(),
  onPlayBtnClick: () => jest.fn(),
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
    render(<HeroContent {...defaultProps} />);

    expect(screen.getByText(/Test tile/)).toBeInTheDocument();
    expect(screen.getByText("2023/03/12,")).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByText(/6.4/)).toBeInTheDocument();
    expect(screen.getByText(/Test movie description/)).toBeInTheDocument();
  });
});
