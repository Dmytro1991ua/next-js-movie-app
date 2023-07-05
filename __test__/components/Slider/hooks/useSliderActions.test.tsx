import { act, renderHook } from "@testing-library/react-hooks";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";

import { useSliderActions } from "@/components/Slider/hooks/useSliderActions";
import createMockRouter from "@/mocks/createMockRouter";
import { mockSessionWithUser } from "@/mocks/testMocks";
import { AppRoutes, SeeMorePageRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("useSliderActions", () => {
  const useRouterMock = jest.fn();
  useRouterMock.mockReturnValue({ push: useRouterMock });

  const hook = () =>
    renderHook(
      () =>
        useSliderActions({
          seeMoreRoute: SeeMorePageRoutes.HorrorMovies,
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <SessionProvider session={mockSessionWithUser}>
            <RouterContext.Provider
              value={createMockRouter({ pathname: AppRoutes.Home })}
            >
              {children}
            </RouterContext.Provider>
          </SessionProvider>
        ),
      }
    );

  it("should handle action icon click", () => {
    const scrollTo = jest.fn();
    const rowRef = {
      current: {
        scrollLeft: 100,
        clientWidth: 200,
        scrollTo,
      } as unknown as HTMLDivElement,
    };

    const { result } = hook();

    result.current.rowRef.current = rowRef.current;

    const { onActionIconClick } = result.current;

    act(() => {
      onActionIconClick("left");
    });

    expect(result.current.isActionButtonClicked).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith({
      left: 100 - 200,
      behavior: "smooth",
    });

    act(() => {
      onActionIconClick("right");
    });

    expect(result.current.isActionButtonClicked).toBe(true);
    expect(scrollTo).toHaveBeenCalledWith({
      left: 100 + 200,
      behavior: "smooth",
    });
  });

  it("should call  onRedirectToSeeMorePage method", () => {
    const { result } = hook();

    act(() => result.current.onRedirectToSeeMorePage());

    expect(useRouterMock().push).toHaveBeenCalled();
  });
});
