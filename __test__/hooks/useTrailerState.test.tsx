import { act, renderHook } from "@testing-library/react-hooks";

import { useTrailerState } from "@/hooks/useTrailerState";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("@/utils/utils");

describe("useTrailerState", () => {
  const { result, rerender } = renderHook(() =>
    useTrailerState({
      id: "test_id",
      name: "Test Name",
    })
  );

  it("Should call onTrailerOpening  method", async () => {
    await act(() => result.current.onTrailerOpening());

    expect(result.current.isTrailerShown).toBe(true);
  });

  it("Should call onTrailerClosing method", async () => {
    await act(() => result.current.onTrailerClosing());

    rerender();

    expect(result.current.isTrailerShown).toBe(false);
    expect(result.current.trailerUrl).toBe(null);
  });
});
