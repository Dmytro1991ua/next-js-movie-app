import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useStarRating } from "@/components/StarRating/hooks/useStarRating";
import StarRating from "@/components/StarRating/StarRating";
import { DEFAULT_NUMBER_OF_START_ICONS } from "@/types/constants";

jest.mock("@/components/StarRating/hooks/useStarRating");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const getStarIconColorMock = jest.fn();
const onMovieRatingStateMock = jest.fn();
const onStartIconMouseEnterEventMock = jest.fn();
const onStartIconMouseLeaveEventMock = jest.fn();

const defaultProps = {
  numberOfStars: DEFAULT_NUMBER_OF_START_ICONS,
  onMovieRatingState: jest.fn(),
  onStartIconMouseEnterEvent: jest.fn(),
  onStartIconMouseLeaveEvent: jest.fn(),
  getStarIconColor: jest.fn(),
};

describe("StarRating", () => {
  beforeEach(() => {
    (useStarRating as jest.Mock).mockImplementation(() => ({
      starRatingValue: 5,
      iconHover: 0,
      onMovieRatingState: onMovieRatingStateMock,
      onStartIconMouseEnterEvent: onStartIconMouseEnterEventMock,
      onStartIconMouseLeaveEvent: onStartIconMouseLeaveEventMock,
      getStarIconColor: getStarIconColorMock,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing with 5 default star icons", () => {
    render(<StarRating {...defaultProps} />);

    expect(screen.getAllByTestId("star-rating")[0]).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[1]).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[2]).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[3]).toBeInTheDocument();
    expect(screen.getAllByTestId("star-rating")[4]).toBeInTheDocument();
  });

  it("should correctly apply color to a specific star icon", () => {
    render(
      <StarRating {...defaultProps} getStarIconColor={getStarIconColorMock} />
    );

    const starIcon = screen.getAllByTestId("star-rating")[0];

    userEvent.click(starIcon);

    expect(getStarIconColorMock).toHaveBeenCalled();
  });

  it("should call onMovieRatingState method on click to a specific star icon", async () => {
    render(
      <StarRating
        {...defaultProps}
        onMovieRatingState={onMovieRatingStateMock}
      />
    );

    const starIcon = screen
      .getAllByTestId("star-rating")[0]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector(".cursor-pointer") as HTMLImageElement;
    userEvent.click(starIcon);

    await waitFor(() => expect(onMovieRatingStateMock).toHaveBeenCalled());
  });

  it("should call the correct handlers on mouse enter and leave events", async () => {
    const onStartIconMouseEnterEventMock = jest.fn();
    const onStartIconMouseLeaveEventMock = jest.fn();

    render(
      <StarRating
        {...defaultProps}
        onStartIconMouseEnterEvent={onStartIconMouseEnterEventMock}
        onStartIconMouseLeaveEvent={onStartIconMouseLeaveEventMock}
      />
    );

    const starIcon = screen
      .getAllByTestId("star-rating")[0]
      // eslint-disable-next-line testing-library/no-node-access
      .querySelector(".cursor-pointer") as HTMLImageElement;

    fireEvent.mouseOver(starIcon);
    await waitFor(() =>
      expect(onStartIconMouseEnterEventMock).toHaveBeenCalledTimes(1)
    );

    fireEvent.mouseOut(starIcon);
    await waitFor(() =>
      expect(onStartIconMouseLeaveEventMock).toHaveBeenCalledTimes(1)
    );
  });
});
