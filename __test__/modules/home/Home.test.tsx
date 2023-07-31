import { screen } from "@testing-library/react";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import Home from "@/modules/home";
import { AppRoutes } from "@/types/enums";

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
jest.mock("@/hooks/queries/useFetchMoviesOrSerialsData");

describe("Home", () => {
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
    (useFetchMoviesOrSerialsData as jest.Mock).mockImplementation(() => ({
      data: {
        nowPlayingMovies: { results: [mockMovie] },
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <Home />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText(/View Details/)).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByText(/Popular/)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming/)).toBeInTheDocument();
    expect(screen.getByTestId("hero-img")).toBeInTheDocument();
  });
});
