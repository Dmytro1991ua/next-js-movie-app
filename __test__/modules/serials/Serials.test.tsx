import { screen } from "@testing-library/react";
import { QueryObserverSuccessResult } from "react-query";
import * as hooks from "react-query";

import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import { mockMovie, withQueryClientProvider } from "@/mocks/testMocks";
import Serials from "@/modules/serials";

jest.mock("react-query", () => {
  const originalModule = jest.requireActual("react-query");

  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});

jest.mock("@/hooks/useGetRandomMovieOrSerial");

describe("Serials", () => {
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
    withQueryClientProvider(<Serials />);

    expect(screen.getByText(/View Details/)).toBeInTheDocument();
    expect(screen.getByText(/IMDB/)).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
