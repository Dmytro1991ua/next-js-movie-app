import { screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";

import {
  mockSessionWithUser,
  withQueryClientAndRouterProvider,
} from "@/mocks/testMocks";
import SearchMoviePage, {
  getServerSideProps,
} from "@/pages/search/movie/[movieSearchParam]";
import { searchService } from "@/services/search.service";
import { AppRoutes } from "@/types/enums";

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

describe("SearchMoviePage", () => {
  it("Should render component without crashing", () => {
    withQueryClientAndRouterProvider(
      <SearchMoviePage />,
      AppRoutes.SearchMovies
    );

    expect(screen.getByTestId("cards")).toBeInTheDocument();
  });

  it("Should trigger getServerSideProps and called fetchDataForSearchPage method within searchService", async () => {
    const fetchMoviesForSearchPageMock = jest.spyOn(
      searchService,
      "fetchDataForSearchPage"
    );

    getServerSideProps({
      session: mockSessionWithUser,
      query: {
        movieSearchParam: "Test Search Query",
      },
    } as unknown as GetServerSidePropsContext);

    expect(fetchMoviesForSearchPageMock).toHaveBeenCalled();
  });
});
