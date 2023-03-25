import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Slider from "@/components/Slider";
import { mockMovie } from "@/mocks/testMocks";
import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { SliderTitle } from "@/types/enums";

import { useSliderActions } from "./../../../components/Slider/hooks/useSliderActions";

jest.mock("./../../../components/Slider/hooks/useSliderActions");

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

describe("Slider", () => {
  const SliderComponent = () => <Slider {...defaultProps} />;

  beforeEach(() => {
    (useSliderActions as jest.Mock).mockImplementation(() => ({
      isActionButtonClicked: true,
      rowRef: null,
      onActionIconClick: mockOnClick,
    }));
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

    userEvent.click(leftArrowIcon);

    await waitFor(() => expect(mockOnClick).toHaveBeenCalled());
  });

  it("Should click on right arrow icon and trigger onActionIconClick method", async () => {
    render(<SliderComponent />);

    const rightArrowIcon = screen.getByTestId("arrow-right");

    userEvent.click(rightArrowIcon);

    await waitFor(() => expect(mockOnClick).toHaveBeenCalled());
  });
});
