import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useStarRating } from "@/components/StarRating/hooks/useStarRating";
import {
  STAR_ICON_COLOR_FILLED,
  STAR_ICON_COLOR_UNFILLED,
} from "@/types/constants";

describe("useStarRating", () => {
  const view = (rating: number) =>
    renderHook(() =>
      useStarRating({
        rating,
        colorFilled: STAR_ICON_COLOR_FILLED,
        colorUnfilled: STAR_ICON_COLOR_UNFILLED,
      })
    );

  it("Should have correct starRatingValue equal to 4 based on movie/serial rating (8) props", async () => {
    const { result } = view(8);

    act(() => expect(result.current.starRatingValue).toEqual(4));
  });

  it("Should have correct starRatingValue equal to 2 based on movie/serial rating (5) props", async () => {
    const { result } = view(5);

    act(() => expect(result.current.starRatingValue).toEqual(3));
  });

  it("Should have a devalt iconHover value equal to 0", () => {
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

  it("Should call onMovieRatingState and set star icon rating value", () => {
    const { result } = view(5);

    act(() => result.current.onMovieRatingState(2));

    expect(result.current.starRatingValue).toEqual(2);
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
