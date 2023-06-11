import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Hero from "@/components/Hero";
import * as utils from "@/components/Hero/hooks/useHeroState";
import {
  RandomMovieOrSerial,
  useGetRandomMovieOrSerial,
} from "@/hooks/useGetRandomMovieOrSerial";
import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { AppRoutes } from "@/types/enums";

jest.mock("@/hooks/useGetRandomMovieOrSerial");

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Hero", () => {
  beforeEach(() => {
    (useGetRandomMovieOrSerial as jest.Mock).mockImplementation(() => ({
      data: mockMovie,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <Hero data={[mockMovie as RandomMovieOrSerial]} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText(/View Details/)).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render the VideoPlayer component when isTrailerShown is true and trailerUrl is provided", () => {
    jest.spyOn(utils, "useHeroState").mockReturnValue({
      initialRatingValue: 0,
      isTrailerShown: true,
      randomMovieOrSerial: mockMovie as Movie & Serial,
      newRatingData: {
        id: 1,
        name: "test_name",
      },
      newRating: 0,
      onHandleRedirectToDetailsPage: jest.fn(),
      onTrailerClosing: jest.fn(),
      onTrailerOpening: jest.fn(),
      trailerUrl: "https://example.com/trailer.mp4",
    });

    withQueryClientAndSessionProvider(
      <Hero data={[mockMovie as RandomMovieOrSerial]} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByTestId("video-player")).toBeInTheDocument();
  });

  it("should not render the VideoPlayer component when trailerUrl is not provided", () => {
    jest.spyOn(utils, "useHeroState").mockReturnValue({
      initialRatingValue: 0,
      isTrailerShown: false,
      randomMovieOrSerial: mockMovie as Movie & Serial,
      newRatingData: {
        id: 1,
        name: "test_name",
      },
      newRating: 0,
      onHandleRedirectToDetailsPage: jest.fn(),
      onTrailerClosing: jest.fn(),
      onTrailerOpening: jest.fn(),
      trailerUrl: "",
    });

    withQueryClientAndSessionProvider(
      <Hero data={[mockMovie as RandomMovieOrSerial]} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.queryByTestId("video-player")).toBeNull();
  });

  it("should call onTrailerClosing when VideoPlayer is closed", async () => {
    const onTrailerClosing = jest.fn();

    jest.spyOn(utils, "useHeroState").mockReturnValue({
      initialRatingValue: 0,
      isTrailerShown: true,
      randomMovieOrSerial: mockMovie as Movie & Serial,
      newRatingData: {
        id: 1,
        name: "test_name",
      },
      newRating: 0,
      onHandleRedirectToDetailsPage: jest.fn(),
      onTrailerClosing: onTrailerClosing,
      onTrailerOpening: jest.fn(),
      trailerUrl: "test_url",
    });

    withQueryClientAndSessionProvider(
      <Hero data={[mockMovie as RandomMovieOrSerial]} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    const closeBtn = screen.getByText("Close");

    expect(closeBtn).toBeInTheDocument();

    userEvent.click(closeBtn);

    await waitFor(() => expect(onTrailerClosing).toHaveBeenCalled());
  });
});
