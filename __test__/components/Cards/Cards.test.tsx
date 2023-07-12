import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Cards from "@/components/Cards/Cards";
import {
  mockSerialDetails,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import { AppRoutes } from "@/types/enums";
import { MovieOrSerialResults } from "@/types/interfaces";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("@/hooks/useRedirectStatus");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/Cards/CardsHeader/CardsHeader", () => {
  return jest.fn(({ onClick, title }) => (
    <div data-testid="cards-header" onClick={onClick}>
      <p>{title}</p>
    </div>
  ));
});

const defaultProps = {
  cards: [mockSerialDetails] as unknown as (MovieOrSerialResults | undefined)[],
  route: AppRoutes.Home,
  title: "test_title",
  fetchNextPage: jest.fn(),
  dataLength: 20,
  hasNextPage: false,
  isLoading: false,
};

describe("Card", () => {
  it("should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <Cards {...defaultProps} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText("Breaking Bad")).toBeInTheDocument();
    expect(screen.getByText("test_title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText("See Details")).toBeInTheDocument();
  });

  it("should loading text when api returns more data on scroll", () => {
    withQueryClientAndSessionProvider(
      <Cards {...defaultProps} hasNextPage={true} isLoading={true} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should fire handleGoBackRedirect method on go back button click", () => {
    const useRouterMock = jest.fn();
    useRouterMock.mockReturnValue({ back: useRouterMock });

    withQueryClientAndSessionProvider(
      <Cards {...defaultProps} hasNextPage={true} isLoading={true} />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    userEvent.click(screen.getByTestId("cards-header"));

    expect(useRouterMock().back).toHaveBeenCalled();
  });

  it("should call fetchNextPage on scroll", () => {
    const fetchNextPageMock = jest.fn();

    withQueryClientAndSessionProvider(
      <Cards
        {...defaultProps}
        fetchNextPage={fetchNextPageMock}
        hasNextPage={true}
        isLoading={true}
      />,
      mockSessionWithUser,
      AppRoutes.Home
    );

    Object.defineProperty(window, "scrollY", { value: 100 });

    fireEvent.scroll(window);

    expect(fetchNextPageMock).toHaveBeenCalled();
  });
});
