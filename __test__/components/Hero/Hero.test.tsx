import { render, screen } from "@testing-library/react";

import Hero from "@/components/Hero";
import {
  RandomMovieOrSerial,
  useGetRandomMovieOrSerial,
} from "@/hooks/useGetRandomMovieOrSerial";
import { mockMovie } from "@/mocks/testMocks";

jest.mock("@/hooks/useGetRandomMovieOrSerial");

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
    render(<Hero data={[mockMovie as RandomMovieOrSerial]} />);

    expect(screen.getByText(/View Details/)).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
