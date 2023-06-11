import { fireEvent, render, screen } from "@testing-library/react";

import FallbackImage from "@/components/FallbackImage/FallbackImage";

const defaultProps = {
  imageUrl: "https://test_image_url",
  altText: "test_alt_text",
  width: "300px",
  height: "300px",
  isActive: false,
};

describe("FallbackMessage", () => {
  it("should render component without crashing", () => {
    render(<FallbackImage {...defaultProps} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render default user photo when imageUrl is null", () => {
    const mockDefaultUserPhoto =
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

    render(<FallbackImage {...defaultProps} altText="User" imageUrl={null} />);

    const fallbackImage = screen.getByAltText("User");

    expect(fallbackImage.getAttribute("src")).toContain(mockDefaultUserPhoto);
  });

  it("should render provided image when imageUrl is not null", () => {
    const imageUrl = "https://example.com/image.jpg";

    render(
      <FallbackImage {...defaultProps} altText="User" imageUrl={imageUrl} />
    );

    const fallbackImage = screen.getByAltText("User");

    expect(fallbackImage).toBeInTheDocument();
    expect(fallbackImage.getAttribute("src")).not.toBeNull();
  });

  it("should render the fallback image on error", () => {
    render(<FallbackImage {...defaultProps} />);

    const fallbackImage = screen.getByAltText("test_alt_text");

    fireEvent(fallbackImage, new Event("error"));

    expect(screen.getByAltText("test_alt_text")).toBeInTheDocument();
  });

  it("should have applied border styles when isActive true", () => {
    render(<FallbackImage {...defaultProps} isActive />);

    const imageWrapper = screen.getByTestId("image-wrapper");

    expect(imageWrapper).toBeInTheDocument();
    expect(imageWrapper).toHaveClass(
      "flex rounded-[50%] bg-powderAsh border-2 border-white"
    );
  });

  it("should not have applied border styles when isActive false", () => {
    render(<FallbackImage {...defaultProps} isActive={false} />);

    const imageWrapper = screen.getByTestId("image-wrapper");

    expect(imageWrapper).toBeInTheDocument();
    expect(imageWrapper).toHaveClass(
      "flex rounded-[50%] bg-powderAsh border-0 border-transparent"
    );
  });
});
