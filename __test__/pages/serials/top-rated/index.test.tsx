import { screen } from "@testing-library/react";
import { GetServerSidePropsContext } from "next";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientProvider,
} from "@/mocks/testMocks";
import { serialsPageService } from "@/modules/serials/serials.service";
import TopRatedSerialsPage, {
  getServerSideProps,
} from "@/pages/serials/top-rated";
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

describe("TopRatedSerialsPage", () => {
  beforeEach(() => {
    jest.spyOn(hooks, "useQuery").mockReturnValue({
      data: {
        topRatedSerials: {
          results: [mockMovie],
        },
      },
    } as unknown as QueryObserverSuccessResult<unknown, unknown>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientProvider(<TopRatedSerialsPage />);

    expect(screen.getByText(/TopRatedSerialsPage/)).toBeInTheDocument();
  });

  it("Should trigger getServerSideProps and called fetchSerialsData method within serialsPageService", async () => {
    const fetchSerialsForSerialsPageMock = jest.spyOn(
      serialsPageService,
      "fetchSerialsData"
    );
    const prefetchMovieOrSerialDataMock = jest.spyOn(
      utils,
      "prefetchMovieOrSerialData"
    );

    getServerSideProps({
      session: mockSessionWithUser,
    } as unknown as GetServerSidePropsContext);

    expect(prefetchMovieOrSerialDataMock).toHaveBeenCalled();
    expect(fetchSerialsForSerialsPageMock).toHaveBeenCalled();
  });
});