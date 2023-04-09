import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import VideoPlayer from "@/components/VideoPlayer";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const mockOnCloseHandler = jest.fn();
const mockTrailerUrl = "d2k4QAItiSA";

describe("VideoPlayer", () => {
  const VideoPlayerComponent = (trailerUrl: string, onClose: () => void) =>
    render(<VideoPlayer trailerUrl={trailerUrl} onClose={onClose} />);

  it("Should render component without crashing", () => {
    VideoPlayerComponent(mockTrailerUrl, mockOnCloseHandler);

    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("Should close video player on Close Btn click", async () => {
    VideoPlayerComponent(mockTrailerUrl, mockOnCloseHandler);

    const closeBtn = screen.getByText("Close");

    userEvent.click(closeBtn);

    await waitFor(() => expect(mockOnCloseHandler).toHaveBeenCalled());
  });
});
