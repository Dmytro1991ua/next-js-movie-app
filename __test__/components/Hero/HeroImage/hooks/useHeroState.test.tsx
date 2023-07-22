import { renderHook } from "@testing-library/react-hooks";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { useHeroState } from "@/components/Hero/hooks/useHeroState";
import createMockRouter from "@/mocks/createMockRouter";
import { mockMovie, mockSessionWithUser } from "@/mocks/testMocks";
import { Movie } from "@/model/movie";
import { Serial } from "@/model/serial";
import { ratingService } from "@/services/rating.service";
import { AppRoutes } from "@/types/enums";
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

describe("useHeroState", () => {
  const queryClient = new QueryClient();

  const fetchRatingByIdMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(ratingService, "fetchRatingById")
      .mockImplementation(fetchRatingByIdMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const hook = () =>
    renderHook(
      () =>
        useHeroState({
          data: [mockMovie] as (Movie & Serial)[],
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

  it("should return the correct initialRatingValue", () => {
    const { result } = hook();

    expect(result.current.initialRatingValue).toBe(3);
  });

  it("should return correct random movie based on data props", () => {
    const { result } = hook();

    expect(result.current.randomMovieOrSerial).toBe(mockMovie);
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
