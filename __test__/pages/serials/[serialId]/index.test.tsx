import { screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import { useFetchMoviesOrSerialsData } from "@/hooks/queries/useFetchMoviesOrSerialsData";
import {
  mockSerialCast,
  mockSerialDetails,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import SerialDetailsPage, {
  getServerSideProps,
} from "@/pages/serials/[serialId]";
import { mediaDetailsService } from "@/services/mediaDetails.service";
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

describe("SerialDetailsPage", () => {
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
      query: QueryString.serialDetails,
      fetcher: () => mockQueryFetcher,
    }));

    withQueryClientAndSessionProvider(
      <SerialDetailsPage />,
      mockSessionWithUser,
      AppRoutes.Movies
    );

    expect(useFetchMoviesOrSerialsDataMock).toHaveBeenCalled();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("Should trigger getServerSideProps and called fetchMediaDetailsData method within mediaDetailsService", async () => {
    const fetchMoviesMock = jest
      .spyOn(mediaDetailsService, "fetchMediaDetailsData")
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
