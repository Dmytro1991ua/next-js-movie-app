import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DetailsPage from "@/components/DetailsPage";
import { DetailsPageActionButtons } from "@/components/DetailsPage/enums";
import * as hooks from "@/components/DetailsPage/hooks/useDetailsPage";
import {
  mockSerialCast,
  mockSerialDetails,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import { MovieOrSerialDetail } from "@/model/common";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("DetailsPage", () => {
  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <DetailsPage
        movieOrSerialCast={mockSerialCast}
        movieOrSerialDetails={
          mockSerialDetails as unknown as MovieOrSerialDetail
        }
      />,
      mockSessionWithUser,
      AppRoutes.SerialDetails
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/Breaking Bad/)).toBeInTheDocument();
    expect(screen.getByText(/Remember my name/)).toBeInTheDocument();
    expect(screen.getByText(/First Air Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Last Air Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Revenue:/)).toBeInTheDocument();
    expect(screen.getByText(/Number of seasons:/)).toBeInTheDocument();
    expect(screen.getByText(/Number of episodes:/)).toBeInTheDocument();
    expect(screen.getByText(/Home Page/)).toBeInTheDocument();
    expect(screen.getByText(/Go Back/)).toBeInTheDocument();
    expect(screen.getByText(/Genres:/)).toBeInTheDocument();
    expect(screen.getByText(/Casts:/)).toBeInTheDocument();
    expect(screen.getByText(/Spoken Languages:/)).toBeInTheDocument();
    expect(screen.getByText(/Production Countries:/)).toBeInTheDocument();
  });

  it("should open video player", () => {
    jest.spyOn(hooks, "useDetailsPage").mockImplementation(() => ({
      detailsBlockWithPillsSubtitle: <p>Test block with pills</p>,
      detailsBlockWithMovieOrSerialRelease: (
        <p>Test block with movie or serial release date</p>
      ),
      detailsBlockWithRevenueOrSeasonsDetails: (
        <p>Test block with revenue or seasons details</p>
      ),
      detailsPageActionButtons: <p>Test block with action buttons</p>,
      trailerUrl: "test_url",
      favoriteIcon: [<p key="1">Test favorite icon</p>],
      onTrailerClosing: jest.fn(),
      onGoBackRedirect: jest.fn(),
      isTrailerShown: true,
      initialRatingValue: 6,
      newRating: 8,
    }));

    withQueryClientAndSessionProvider(
      <DetailsPage
        movieOrSerialCast={mockSerialCast}
        movieOrSerialDetails={
          mockSerialDetails as unknown as MovieOrSerialDetail
        }
      />,
      mockSessionWithUser,
      AppRoutes.SerialDetails
    );

    expect(screen.getByTestId("video-player")).toBeInTheDocument();
    expect(screen.getByText(/Close/)).toBeInTheDocument();
  });

  it("should close video player", async () => {
    const mockOnTrailerClosing = jest.fn();

    jest.spyOn(hooks, "useDetailsPage").mockImplementation(() => ({
      detailsBlockWithPillsSubtitle: <p>Test block with pills</p>,
      detailsBlockWithMovieOrSerialRelease: (
        <p>Test block with movie or serial release date</p>
      ),
      detailsBlockWithRevenueOrSeasonsDetails: (
        <p>Test block with revenue or seasons details</p>
      ),
      detailsPageActionButtons: <p>Test block with action buttons</p>,
      trailerUrl: "test_url",
      favoriteIcon: [<p key="1">Test favorite icon</p>],
      onTrailerClosing: mockOnTrailerClosing,
      onGoBackRedirect: jest.fn(),
      isTrailerShown: true,
      initialRatingValue: 6,
      newRating: 8,
    }));

    withQueryClientAndSessionProvider(
      <DetailsPage
        movieOrSerialCast={mockSerialCast}
        movieOrSerialDetails={
          mockSerialDetails as unknown as MovieOrSerialDetail
        }
      />,
      mockSessionWithUser,
      AppRoutes.SerialDetails
    );

    const closeBtn = screen.getByText(/Close/);

    userEvent.click(closeBtn);

    await waitFor(() => expect(mockOnTrailerClosing).toHaveBeenCalled());
  });

  it("should handle redirection to the previous page", () => {
    const mockOnGoBackRedirect = jest.fn();

    jest.spyOn(hooks, "useDetailsPage").mockImplementation(() => ({
      detailsBlockWithPillsSubtitle: <p>Test block with pills</p>,
      detailsBlockWithMovieOrSerialRelease: (
        <p>Test block with movie or serial release date</p>
      ),
      detailsBlockWithRevenueOrSeasonsDetails: (
        <p>Test block with revenue or seasons details</p>
      ),
      detailsPageActionButtons: <p>Test block with action buttons</p>,
      trailerUrl: "test_url",
      favoriteIcon: [<p key="1">Test favorite icon</p>],
      onTrailerClosing: jest.fn(),
      onGoBackRedirect: mockOnGoBackRedirect,
      isTrailerShown: true,
      initialRatingValue: 6,
      newRating: 8,
    }));

    withQueryClientAndSessionProvider(
      <DetailsPage
        movieOrSerialCast={mockSerialCast}
        movieOrSerialDetails={
          mockSerialDetails as unknown as MovieOrSerialDetail
        }
      />,
      mockSessionWithUser,
      AppRoutes.SerialDetails
    );

    const goBackBtn = screen.getByText(DetailsPageActionButtons.GoBack);

    expect(goBackBtn).toBeInTheDocument();

    fireEvent.click(goBackBtn);

    expect(mockOnGoBackRedirect).toHaveBeenCalled();
  });
});
