import { render, screen } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  QueryObserverSuccessResult,
} from "react-query";
import * as hooks from "react-query";

import Home from "@/modules/home";

jest.mock("react-query", () => {
  const originalModule = jest.requireActual("react-query");

  return {
    ...originalModule,
    useQuery: jest.fn(),
  };
});

describe("Home", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it("Should render component without crashing", () => {
    jest.spyOn(hooks, "useQuery").mockReturnValue({
      data: [{ id: "Test ID", title: "Test name", body: "Test description" }],
    } as unknown as QueryObserverSuccessResult<unknown, unknown>);

    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );

    expect(screen.getByText(/Test ID/)).toBeInTheDocument();
    expect(screen.getByText(/Test name/)).toBeInTheDocument();
    expect(screen.getByText(/Test description/)).toBeInTheDocument();
  });
});
