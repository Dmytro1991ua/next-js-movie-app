import { screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import { homePageService } from "@/modules/home/home.service";
import HomePage, { getServerSideProps } from "@/pages/home/index";
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

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "John Doe", email: "john@doe.com" },
        password: "12456",
      }),
  })
);

jest.mock("@/hooks/useGetRandomMovieOrSerial");

describe("HomePage", () => {
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
    withQueryClientAndSessionProvider(
      <HomePage />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText(/View Details/)).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByText(/Popular/)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming/)).toBeInTheDocument();
    expect(screen.getByTestId("hero-img")).toBeInTheDocument();
  });

  it("Should trigger getServerSideProps and called fetchMoviesForHomePage method within homePageService", async () => {
    const fetchMovies = jest.spyOn(homePageService, "fetchMoviesForHomePage");

    getServerSideProps({
      session: mockSessionWithUser,
    } as unknown as GetServerSidePropsContext);

    expect(fetchMovies).toHaveBeenCalled();
  });
});
