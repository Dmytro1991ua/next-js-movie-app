import { renderHook } from "@testing-library/react-hooks";

import { useGetRandomMovieOrSerial } from "@/hooks/useGetRandomMovieOrSerial";
import { mockMovie } from "@/mocks/testMocks";
import { MovieOrSerialResults } from "@/types/interfaces";

describe("useGetRandomMovieOrSerial", () => {
  const { result } = renderHook(() =>
    useGetRandomMovieOrSerial({ data: [mockMovie] as MovieOrSerialResults[] })
  );

  it("Should return a random movie", async () => {
    expect(result.current.randomMovieOrSerial).toEqual(mockMovie);
  });
});
