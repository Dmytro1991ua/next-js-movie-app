import { fireEvent, render, screen } from "@testing-library/react";

import HeroImage from "@/components/Hero/HeroImage";
import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import { mockMovie } from "@/mocks/testMocks";
import { IMAGE_URL } from "@/types/constants";

jest.mock("@/hooks/useGetRandomMovieOrSerial");

describe("HeroImage", () => {
  beforeEach(() => {
    (useGetRandomMovieOrSerial as jest.Mock).mockImplementation(() => ({
      data: mockMovie,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    render(
      <HeroImage imgUrl={`${IMAGE_URL}/32GH8Mi4GmTPIQyd6IW1FFrHWrj.jpg`} />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render default user photo when imageUrl is null", () => {
    const mockDefaultUserPhoto =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    render(<HeroImage imgUrl="" />);

    const fallbackImage = screen.getByAltText("Banner image");

    expect(fallbackImage.getAttribute("src")).toContain(mockDefaultUserPhoto);
  });

  it("should render provided image when imageUrl is not null", () => {
    const imageUrl = "https://example.com/image.jpg";

    render(<HeroImage imgUrl={imageUrl} />);

    const fallbackImage = screen.getByAltText("Banner image");

    expect(fallbackImage).toBeInTheDocument();
    expect(fallbackImage.getAttribute("src")).not.toBeNull();
  });

  it("should render the fallback image on error", () => {
    render(<HeroImage imgUrl="" />);

    const fallbackImage = screen.getByAltText("Banner image");

    fireEvent(fallbackImage, new Event("error"));

    expect(screen.getByAltText("Banner image")).toBeInTheDocument();
  });
});
