import { fireEvent, render, screen } from "@testing-library/react";

import { heroContentActionButtonsConfig } from "@/components/Hero/configs";
import { HeroContentActionButtons } from "@/components/Hero/enums";
import { getHeroContentActionButtons } from "@/components/Hero/utils";

jest.mock("@/components/Hero/configs");

describe("getHeroContentActionButtons", () => {
  const defaultProps = {
    onDetailsBtnClick: jest.fn(),
    onPlayBtnClick: jest.fn(),
    isLoading: false,
    clickedButtonId: "1",
    onHandleButtonClick: jest.fn(),
  };

  const mockConfig = [
    {
      id: HeroContentActionButtons.ViewDetails,
      label: HeroContentActionButtons.ViewDetails,
      icon: <p>test icon</p>,
      variant: "primary",
      isLoading: false,
      onClick: defaultProps.onDetailsBtnClick,
    },
  ];

  it("should correctly render actions button for Hero content", () => {
    (heroContentActionButtonsConfig as jest.Mock).mockReturnValue(mockConfig);

    render(getHeroContentActionButtons({ ...defaultProps }));

    expect(screen.getByText("test icon")).toBeInTheDocument();
    expect(screen.getByText("View Details")).toBeInTheDocument();
  });

  it("should call onDetailsBtnClick when play button is clicked", () => {
    (heroContentActionButtonsConfig as jest.Mock).mockReturnValue(mockConfig);

    render(getHeroContentActionButtons({ ...defaultProps }));

    const viewDetailsButton = screen.getByText("View Details");

    fireEvent.click(viewDetailsButton);

    expect(defaultProps.onHandleButtonClick).toHaveBeenCalled();
  });

  it("should render a button loader when isLoading is true", () => {
    (heroContentActionButtonsConfig as jest.Mock).mockReturnValue(
      mockConfig.map((config) => ({
        ...config,
        isLoading: true,
      }))
    );

    render(
      getHeroContentActionButtons({
        ...defaultProps,
        clickedButtonId: HeroContentActionButtons.ViewDetails,
      })
    );

    expect(screen.getByTestId("button-loader")).toBeInTheDocument();
  });
});
