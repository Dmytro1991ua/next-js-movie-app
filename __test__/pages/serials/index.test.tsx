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
import { serialsPageService } from "@/modules/serials/serials.service";
import SerialsPage, { getServerSideProps } from "@/pages/serials";

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

describe("SerialsPage", () => {
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
    withQueryClientProvider(<SerialsPage />);

    expect(screen.getByText(/View Details/)).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByText(/On The Air/)).toBeInTheDocument();
    expect(screen.getByText(/Airing Today/)).toBeInTheDocument();
    expect(screen.getByTestId("hero-img")).toBeInTheDocument();
  });

  it("Should trigger getServerSideProps and called fetchMoviesByGenre method within moviesPageService", async () => {
    const fetchSerials = jest.spyOn(serialsPageService, "fetchSerialsData");

    getServerSideProps({
      session: mockSessionWithUser,
    } as unknown as GetServerSidePropsContext);

    expect(fetchSerials).toHaveBeenCalled();
  });
});
