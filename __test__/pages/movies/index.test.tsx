import { screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientProvider,
} from "@/mocks/testMocks";
import { moviesPageService } from "@/modules/movies/movies.service";
import MoviesPage, { getServerSideProps } from "@/pages/movies";

jest.mock("react-query", () => {
  const originalModule = jest.requireActual("react-query");

  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("@/hooks/useGetRandomMovieOrSerial");

describe("MoviesPage", () => {
  beforeEach(() => {
    jest.spyOn(hooks, "useQuery").mockReturnValue({
      data: {
        popularMovies: {
          results: [mockMovie],
        },
      },
    } as unknown as QueryObserverSuccessResult<unknown, unknown>);
    (useGetRandomMovieOrSerial as jest.Mock).mockImplementation(() => ({
      data: mockMovie,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientProvider(<MoviesPage />);

    expect(screen.getByText(/View Details/)).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByText(/Action/)).toBeInTheDocument();
    expect(screen.getByText(/Comedy/)).toBeInTheDocument();
    expect(screen.getByText(/War/)).toBeInTheDocument();
    expect(screen.getByTestId("hero-img")).toBeInTheDocument();
  });

  it("Should trigger getServerSideProps and called fetchMoviesByGenre method within moviesPageService", async () => {
    const fetchMoviesByGenre = jest.spyOn(
      moviesPageService,
      "fetchMoviesByGenre"
    );

    getServerSideProps({
      session: mockSessionWithUser,
    } as unknown as GetServerSidePropsContext);

    expect(fetchMoviesByGenre).toHaveBeenCalled();
  });
});
