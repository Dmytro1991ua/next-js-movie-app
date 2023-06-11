import { renderHook } from "@testing-library/react-hooks";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { useCardState } from "@/components/Card/hooks/useCardState";
import createMockRouter from "@/mocks/createMockRouter";
import { mockMovie, mockSessionWithUser } from "@/mocks/testMocks";
import { homePageService } from "@/modules/home/home.service";
import { AppRoutes } from "@/types/enums";
import { MovieOrSerialResults } from "@/types/interfaces";
import { handleRedirectToDetailsPage } from "@/utils/utils";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("@/utils/utils", () => {
  const utils = jest.requireActual("@/utils/utils");

  return {
    ...utils,
    handleRedirectToDetailsPage: jest.fn(),
  };
});

describe("useDetailsPage", () => {
  const queryClient = new QueryClient();

  const fetchRatingByIdMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(homePageService, "fetchRatingById")
      .mockImplementation(fetchRatingByIdMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const hook = () =>
    renderHook(
      () =>
        useCardState({
          movieOrSerialData: mockMovie as MovieOrSerialResults,
          route: AppRoutes.Home,
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            <SessionProvider session={mockSessionWithUser}>
              <RouterContext.Provider
                value={createMockRouter({ pathname: AppRoutes.Home })}
              >
                {children}
              </RouterContext.Provider>
            </SessionProvider>
          </QueryClientProvider>
        ),
      }
    );

  it("should return the correct imageUrl", () => {
    const { result } = hook();

    expect(result.current.imageUrl).toBe(
      "https://test-small-image/mbigXpUgVgLOacgxlyFfsLRFqxQ.jpg"
    );
  });

  it("should return the correct initialRatingValue", () => {
    const { result } = hook();

    expect(result.current.initialRatingValue).toBe(3);
  });

  it("should call handleRedirectToDetailsPage with the correct parameters", () => {
    const { result } = hook();

    const { onHandleRedirectToDetailsPage } = result.current;

    onHandleRedirectToDetailsPage();

    expect(handleRedirectToDetailsPage).toHaveBeenCalledWith({
      router: expect.any(Object),
      route: AppRoutes.Home,
      id: mockMovie.id,
    });
  });
});
