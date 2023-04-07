import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

import { useReadMore } from "@/components/ReadMore/hooks/useReadMore";
import { DEFAULT_READ_MORE_TEXT_LIMIT } from "@/types/constants";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

const mockDefaultText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit illo labore nesciunt explicabo tempore, sed recusandae nisi ipsum quia id obcaecati voluptas saepe cum molestiae a! Repudiandae alias dolor odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima porro debitis non quaerat reiciendis veniam corrupti, obcaecati explicabo vel sunt. Ipsa temporibus aliquam ea, quia inventore eaque doloremque cumque tenetur! Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio aliquam totam consequuntur nam nihil obcaecati voluptatem incidunt voluptatibus possimus quia porro, deserunt dicta consectetur, quidem praesentium, dolor explicabo iure? Odit?";

const mockTruncatedText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit illo labore nesciunt explicabo tempore, sed recusandae nisi ipsum quia id obcaecati voluptas saepe cum molestiae a! Repudiandae alias dolor odit! Lorem ipsum dolor sit amet consectetur ad";

describe("useReadMore", () => {
  const view = (text: string, limit: number) =>
    renderHook(() =>
      useReadMore({
        text,
        limit,
      })
    );

  it("Should return truncated long text", async () => {
    const { result } = view(mockDefaultText, DEFAULT_READ_MORE_TEXT_LIMIT);

    act(() =>
      expect(result.current.truncatedLongText).toEqual(mockTruncatedText)
    );
  });

  it("Should call onToggleReadMoreButton handler", async () => {
    const { result } = view(mockDefaultText, DEFAULT_READ_MORE_TEXT_LIMIT);

    act(() => result.current.onToggleReadMoreButton());

    expect(result.current.isReadMore).toEqual(true);
  });
});
