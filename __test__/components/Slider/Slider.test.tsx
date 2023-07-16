import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import Slider from "@/components/Slider";
import { useButtonAction } from "@/hooks/useButtonAction";
import { useRedirectStatus } from "@/hooks/useRedirectStatus";
import { mockMovie } from "@/mocks/testMocks";
import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { SliderTitle } from "@/types/enums";

import { useSliderActions } from "./../../../components/Slider/hooks/useSliderActions";

jest.mock("./../../../components/Slider/hooks/useSliderActions");
jest.mock("@/hooks/useRedirectStatus");
jest.mock("@/hooks/useButtonAction");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const defaultProps = {
  data: [mockMovie] as unknown as (Movie & Serial)[],
  title: SliderTitle.SerialsAiringToday,
};

const mockOnClick = jest.fn();
const mockOnRedirectToSeeMorePage = jest.fn();

describe("Slider", () => {
  const SliderComponent = () => <Slider {...defaultProps} />;

  beforeEach(() => {
    (useSliderActions as jest.Mock).mockImplementation(() => ({
      isActionButtonClicked: true,
      rowRef: null,
      isLoading: false,
      onActionIconClick: mockOnClick,
      onRedirectToSeeMorePage: mockOnRedirectToSeeMorePage,
    }));
    (useRedirectStatus as jest.Mock).mockReturnValue(false);

    (useButtonAction as jest.Mock).mockReturnValue({
      clickedButtonId: null,
      isSubmitting: false,
      onSubmitting: jest.fn(),
      onHandleButtonClick: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    render(<SliderComponent />);

    expect(screen.getByText(/Airing Today/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-left")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-right")).toBeInTheDocument();
  });

  it("Should click on left arrow icon and trigger onActionIconClick method", async () => {
    render(<SliderComponent />);

    const leftArrowIcon = screen.getByTestId("arrow-left");

    fireEvent.click(leftArrowIcon);

    await waitFor(() => expect(mockOnClick).toHaveBeenCalled());
  });

  it("Should click on right arrow icon and trigger onActionIconClick method", async () => {
    render(<SliderComponent />);

    const rightArrowIcon = screen.getByTestId("arrow-right");

    fireEvent.click(rightArrowIcon);

    await waitFor(() => expect(mockOnClick).toHaveBeenCalled());
  });

  it("should trigger See More button handler on button click", async () => {
    render(<SliderComponent />);

    const seeMoreButton = screen.getByText("See More");

    fireEvent.click(seeMoreButton);

    await waitFor(() => expect(mockOnRedirectToSeeMorePage).toHaveBeenCalled());
  });

  it("should hide left arrow button when isActionButtonClicked is false", () => {
    (useSliderActions as jest.Mock).mockImplementation(() => ({
      isActionButtonClicked: false,
      rowRef: null,
      isLoading: false,
      onActionIconClick: mockOnClick,
      onRedirectToSeeMorePage: mockOnRedirectToSeeMorePage,
    }));

    render(<SliderComponent />);

    const leftArrowIcon = screen.getByTestId("arrow-left");

    expect(leftArrowIcon).toHaveClass("hidden");
  });
});
