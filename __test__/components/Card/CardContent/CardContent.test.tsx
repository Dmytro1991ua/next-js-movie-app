import { fireEvent, render, screen } from "@testing-library/react";

import CardContent from "@/components/Card/CardContent/CardContent";
import { useButtonAction } from "@/hooks/useButtonAction";
import { useRedirectStatus } from "@/hooks/useRedirectStatus";

jest.mock("@/hooks/useRedirectStatus");
jest.mock("@/hooks/useButtonAction");

describe("CardContent", () => {
  const mockId = 2;

  const defaultProps = {
    serialName: "test_serial_name",
    movieTitle: "test_movie_name",
    rating: 7,
    releaseDate: "test_release_date",
    entityId: mockId,
    firstAirDate: "test_first_air_date",
    onClick: jest.fn(),
    getStarIconColor: () => "test_color",
    onMovieRatingState: jest.fn(),
    onStartIconMouseEnterEvent: jest.fn(),
    onStartIconMouseLeaveEvent: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render component without crashing", () => {
    (useRedirectStatus as jest.Mock).mockReturnValue(false);

    (useButtonAction as jest.Mock).mockReturnValue({
      clickedButtonId: null,
      isSubmitting: false,
      onSubmitting: jest.fn(),
      onHandleButtonClick: jest.fn(),
    });

    render(<CardContent {...defaultProps} />);

    expect(screen.getByText("test_movie_name")).toBeInTheDocument();
    expect(screen.getByText("test_movie_name")).toBeInTheDocument();
    expect(screen.getByText(/test_release_date/)).toBeInTheDocument();
    expect(screen.getByText("See Details")).toBeInTheDocument();
  });

  it("should correctly trigger See More button's onClick handler", async () => {
    const mockOnClick = jest.fn();
    const mockOnHandleButtonClick = jest.fn();

    (useButtonAction as jest.Mock).mockReturnValue({
      clickedButtonId: mockId,
      isSubmitting: false,
      onSubmitting: jest.fn(),
      onHandleButtonClick: mockOnHandleButtonClick,
    });

    render(
      <CardContent {...defaultProps} entityId={mockId} onClick={mockOnClick} />
    );

    const seeMoreButton = screen.getByText("See Details");

    fireEvent.click(seeMoreButton);

    expect(mockOnHandleButtonClick).toHaveBeenCalledTimes(1);
    expect(mockOnHandleButtonClick).toHaveBeenCalledWith(mockId, mockOnClick);
  });

  it("should render isLoading state correctly", () => {
    (useRedirectStatus as jest.Mock).mockReturnValue(true);

    (useButtonAction as jest.Mock).mockReturnValue({
      clickedButtonId: mockId,
      isSubmitting: true,
      onSubmitting: jest.fn(),
      onHandleButtonClick: jest.fn(),
    });

    render(<CardContent {...defaultProps} entityId={mockId} />);

    const loadingIndicator = screen.getByTestId("button-loader");

    expect(loadingIndicator).toBeInTheDocument();
  });
});
