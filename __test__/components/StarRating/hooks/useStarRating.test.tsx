import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { useStarRating } from "@/components/StarRating/hooks/useStarRating";
import { mockSessionWithUser } from "@/mocks/testMocks";
import {
  STAR_ICON_COLOR_FILLED,
  STAR_ICON_COLOR_UNFILLED,
} from "@/types/constants";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("useStarRating", () => {
  const queryClient = new QueryClient();

  const view = (rating: number) =>
    renderHook(
      () =>
        useStarRating({
          rating,
          colorFilled: STAR_ICON_COLOR_FILLED,
          colorUnfilled: STAR_ICON_COLOR_UNFILLED,
          newRating: {
            id: 100,
            name: "Test_Movie",
          },
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            <SessionProvider session={mockSessionWithUser}>
              {children}
            </SessionProvider>
          </QueryClientProvider>
        ),
      }
    );

  it("Should have correct starRatingValue equal based on TMDB or custom rating coming from DB", async () => {
    const { result } = view(8);

    act(() => expect(result.current.starRatingValue).toEqual(8));
  });

  it("Should have a default iconHover value equal to 0", () => {
    const { result } = view(8);

    act(() => expect(result.current.iconHover).toEqual(0));
  });

  it("Should return colorFilled value based on star icon index", () => {
    const { result } = view(8);

    act(() =>
      expect(result.current.getStarIconColor(4)).toEqual(STAR_ICON_COLOR_FILLED)
    );
  });

  it("Should return colorUnfilled value based on star icon index", () => {
    const { result } = view(0);

    act(() =>
      expect(result.current.getStarIconColor(3)).toEqual(
        STAR_ICON_COLOR_UNFILLED
      )
    );
  });

  it("Should call onStartIconMouseEnterEvent and set star icon rating value on hover", () => {
    const { result } = view(5);

    act(() => result.current.onStartIconMouseEnterEvent(3));

    expect(result.current.iconHover).toEqual(3);
  });

  it("Should call onStartIconMouseLeaveEvent and set star icon rating value on hover", () => {
    const { result } = view(5);

    act(() => result.current.onStartIconMouseLeaveEvent());

    expect(result.current.iconHover).toEqual(0);
  });
});
