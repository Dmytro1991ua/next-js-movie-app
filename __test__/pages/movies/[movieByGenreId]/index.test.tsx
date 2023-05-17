import { screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import {
  mockSerialCast,
  mockSerialDetails,
  mockSessionWithUser,
  withQueryClientAndRouterProvider,
} from "@/mocks/testMocks";
import { moviesPageService } from "@/modules/movies/movies.service";
import MovieByGenreDetailsPage, {
  getServerSideProps,
} from "@/pages/movies/[movieByGenreId]";
import { AppRoutes, QueryString } from "@/types/enums";

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

jest.mock("@/hooks/queries/useFetchMoviesOrSerialsData");

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "John Doe", email: "john@doe.com" },
        password: "12456",
      }),
  })
);

describe("MovieByGenreDetailsPage", () => {
  const mockQueryFetcher = jest.fn();

  beforeEach(() => {
    jest.spyOn(hooks, "useQuery").mockReturnValue({
      data: {
        popularMovies: {
          results: [mockSerialDetails],
        },
      },
    } as unknown as QueryObserverSuccessResult<unknown, unknown>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    const useFetchMoviesOrSerialsDataMock = (
      useFetchMoviesOrSerialsData as jest.Mock
    ).mockImplementation(() => ({
      query: QueryString.moviesByGenreDetails,
      fetcher: () => mockQueryFetcher,
    }));

    withQueryClientAndRouterProvider(
      <MovieByGenreDetailsPage />,
      AppRoutes.Movies
    );

    expect(useFetchMoviesOrSerialsDataMock).toHaveBeenCalled();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Should trigger getServerSideProps and called fetchMoviesByGenreDetailsData method within moviesPageService", async () => {
    const fetchMoviesMock = jest
      .spyOn(moviesPageService, "fetchMoviesByGenreDetailsData")
      .mockImplementation(async () => ({
        movieOrSerialDetails: mockSerialDetails,
        movieOrSerialActors: mockSerialCast,
      }));

    await getServerSideProps({
      session: mockSessionWithUser,
      query: {
        movieByGenreId: 66633,
      },
    } as unknown as GetServerSidePropsContext);

    expect(fetchMoviesMock).toHaveBeenCalled();
  });
});
