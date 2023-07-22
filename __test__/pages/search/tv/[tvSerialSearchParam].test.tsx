import { screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";

import {
  mockSessionWithUser,
  withQueryClientAndRouterProvider,
} from "@/mocks/testMocks";
import SearchTVSerialPage, {
  getServerSideProps,
} from "@/pages/search/tv/[tvSerialSearchParam]";
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

describe("SearchTVSerialPage", () => {
  it("Should render component without crashing", () => {
    withQueryClientAndRouterProvider(
      <SearchTVSerialPage />,
      AppRoutes.SearchSerials
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
        tvSerialSearchParam: "Test Search Query",
      },
    } as unknown as GetServerSidePropsContext);

    expect(fetchMoviesForSearchPageMock).toHaveBeenCalled();
  });
});
