import { render, screen } from "@testing-library/react";

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
});
