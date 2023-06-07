import { render, screen } from "@testing-library/react";

import { useStarRating } from "@/components/StarRating/hooks/useStarRating";
import StarRating from "@/components/StarRating/StarRating";
import { DEFAULT_NUMBER_OF_START_ICONS } from "@/types/constants";

jest.mock("@/components/StarRating/hooks/useStarRating");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const defaultProps = {
  numberOfStars: DEFAULT_NUMBER_OF_START_ICONS,
  onMovieRatingState: jest.fn(),
  onStartIconMouseEnterEvent: jest.fn(),
  onStartIconMouseLeaveEvent: jest.fn(),
  getStarIconColor: jest.fn(),
};

const onMovieRatingStateMock = jest.fn();
const onStartIconMouseEnterEventMock = jest.fn();
const onStartIconMouseLeaveEvenMock = jest.fn();
const getStarIconColorMock = jest.fn();

describe("StarRating", () => {
  const StarRatingComponent = () => <StarRating {...defaultProps} />;

  beforeEach(() => {
    (useStarRating as jest.Mock).mockImplementation(() => ({
      starRatingValue: 5,
      iconHover: 0,
      onMovieRatingState: () => onMovieRatingStateMock,
      onStartIconMouseEnterEvent: () => onStartIconMouseEnterEventMock,
      onStartIconMouseLeaveEven: () => onStartIconMouseLeaveEvenMock,
      getStarIconColor: () => getStarIconColorMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing with 5 default star icons", () => {
    render(<StarRatingComponent />);

    expect(screen.getAllByTestId("star-rating")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[1]).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[2]).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[3]).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[4]).toBeInTheDocument();
  });
});
