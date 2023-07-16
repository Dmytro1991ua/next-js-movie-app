import { fireEvent, render, screen } from "@testing-library/react";

import SliderThumbnail from "@/components/Slider/SliderThumbnail/SliderThumbnail";
import { useButtonAction } from "@/hooks/useButtonAction";
import { useRedirectStatus } from "@/hooks/useRedirectStatus";
import { mockMovie } from "@/mocks/testMocks";
import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { AppRoutes } from "@/types/enums";

jest.mock("@/hooks/useRedirectStatus");
jest.mock("@/hooks/useButtonAction");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("SliderThumbnail", () => {
  const defaultProps = {
    data: mockMovie as Movie & Serial,
    route: AppRoutes.Home,
  };

  const mockId = 965839;

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

    render(<SliderThumbnail {...defaultProps} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should correctly trigger image onClick handler", async () => {
    const mockOnHandleButtonClick = jest.fn();

    (useButtonAction as jest.Mock).mockReturnValue({
      clickedButtonId: mockId,
      isSubmitting: false,
      onSubmitting: jest.fn(),
      onHandleButtonClick: mockOnHandleButtonClick,
    });

    render(<SliderThumbnail {...defaultProps} />);

    const image = screen.getByRole("img");

    fireEvent.click(image);

    expect(mockOnHandleButtonClick).toHaveBeenCalledTimes(1);
  });

  it("should render isLoading state correctly", () => {
    (useRedirectStatus as jest.Mock).mockReturnValue(true);

    (useButtonAction as jest.Mock).mockReturnValue({
      clickedButtonId: mockId,
      isSubmitting: true,
      onSubmitting: jest.fn(),
      onHandleButtonClick: jest.fn(),
    });

    render(<SliderThumbnail {...defaultProps} />);

    const loadingIndicator = screen.getByTestId("button-loader");

    expect(loadingIndicator).toBeInTheDocument();
  });
});
