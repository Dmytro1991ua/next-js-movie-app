import { screen } from "@testing-library/react";
import { AppProps } from "next/app";
import { DehydratedState } from "react-query";

import {
  mockMovie,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import App from "@/pages/_app";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("App", () => {
  const MockComponent = () => <p>Test component</p>;

  const defaultProps = {
    Component: MockComponent,
    pageProps: {
      session: mockSessionWithUser,
      dehydratedState: {
        mutations: [],
        queries: [mockMovie],
      } as unknown as DehydratedState,
    },
  } as unknown as AppProps;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the App component with required providers and without crashing", () => {
    withQueryClientAndSessionProvider(
      <App {...defaultProps} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("navigation")).toBeInTheDocument();
    expect(screen.getByText("Sign Out")).toBeInTheDocument();
    expect(screen.getByText("Test component")).toBeInTheDocument();
  });
});
