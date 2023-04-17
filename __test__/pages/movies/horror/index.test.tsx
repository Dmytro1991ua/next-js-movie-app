import { screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientProvider,
} from "@/mocks/testMocks";
import { moviesPageService } from "@/modules/movies/movies.service";
import HorrorMoviesPage, { getServerSideProps } from "@/pages/movies/horror";
import * as utils from "@/utils/utils";

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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "John Doe", email: "john@doe.com" },
        password: "12456",
      }),
  })
);

describe("HorrorMoviesPage", () => {
  beforeEach(() => {
    jest.spyOn(hooks, "useQuery").mockReturnValue({
      data: {
        horrorMovies: {
          results: [mockMovie],
        },
      },
    } as unknown as QueryObserverSuccessResult<unknown, unknown>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientProvider(<HorrorMoviesPage />);

    expect(screen.getByText(/Horror Movies/)).toBeInTheDocument();
    expect(screen.getByTestId("cards")).toBeInTheDocument();
  });

  it("Should trigger getServerSideProps and called fetchMoviesByGenre method within moviesPageService", async () => {
    const fetchMoviesForMoviesByGenrePageMock = jest.spyOn(
      moviesPageService,
      "fetchMoviesByGenre"
    );
    const prefetchMovieOrSerialDataMock = jest.spyOn(
      utils,
      "prefetchMovieOrSerialData"
    );

    getServerSideProps({
      session: mockSessionWithUser,
    } as unknown as GetServerSidePropsContext);

    expect(prefetchMovieOrSerialDataMock).toHaveBeenCalled();
    expect(fetchMoviesForMoviesByGenrePageMock).toHaveBeenCalled();
  });
});
