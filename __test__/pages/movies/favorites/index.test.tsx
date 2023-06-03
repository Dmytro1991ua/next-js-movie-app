import { screen } from "@testing-library/react";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import FavoritesMoviesPage from "@/pages/movies/favorites";
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

describe("FavoritesMoviesPage", () => {
  beforeEach(() => {
    jest.spyOn(hooks, "useQuery").mockReturnValue({
      data: {
        popularMovies: {
          results: [mockMovie],
        },
      },
    } as unknown as QueryObserverSuccessResult<unknown, unknown>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <FavoritesMoviesPage />,
      mockSessionWithUser,
      AppRoutes.Movies
    );

    expect(screen.getByText(/My list of favorites movies/)).toBeInTheDocument();
    expect(screen.getByTestId("cards")).toBeInTheDocument();
  });
});
