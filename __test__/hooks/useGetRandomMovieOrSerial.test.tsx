import { act, renderHook } from "@testing-library/react-hooks";
import { useState } from "react";

import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import { mockMovie } from "@/mocks/testMocks";
import { MovieOrSerialResults } from "@/types/interfaces";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

describe("useGetRandomMovieOrSerial", () => {
  it("Should return the correct initial state", () => {
    (useState as jest.Mock).mockReturnValue([null, jest.fn()]);

    const { result } = renderHook(() =>
      useGetRandomMovieOrSerial({ data: [] })
    );

    expect(result.current.randomMovieOrSerial).toBe(null);
  });

  it("Should return a random movie", async () => {
    (useState as jest.Mock).mockReturnValue([mockMovie, jest.fn()]);

    const { result } = renderHook(() =>
      useGetRandomMovieOrSerial({ data: [mockMovie] as MovieOrSerialResults[] })
    );

    expect(result.current.randomMovieOrSerial).toEqual(mockMovie);
  });

  it("should update randomMovieOrSerial when data prop changes", async () => {
    const mockSetState = jest.fn();
    (useState as jest.Mock).mockReturnValue([mockMovie, mockSetState]);

    const { result, rerender } = renderHook(() =>
      useGetRandomMovieOrSerial({ data: [mockMovie] as MovieOrSerialResults[] })
    );

    expect(result.current.randomMovieOrSerial).toBe(mockMovie);

    const newMovie = { ...mockMovie, name: "new_movie", id: "test_id_2" };

    rerender({ data: newMovie });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockSetState).toHaveBeenCalled();
  });
});
