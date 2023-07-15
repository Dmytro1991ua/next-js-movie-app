import { act, waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { useRouter } from "next/router";

import { useSearchMovieOrSerialState } from "@/components/Search/hooks/useSearchMovieOrSerialState";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/components/Search/utils", () => {
  const originalModule = jest.requireActual("@/components/Search/utils");

  return {
    ...originalModule,
    getSearchRedirectUrl: () => "test_search_url",
  };
});

describe("useSearchMovieOrSerialState", () => {
  const pushMock = jest.fn();
  const eventPreventDefaultMock = { preventDefault: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: pushMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const hook = (searchPath: AppRoutes) =>
    renderHook(() => useSearchMovieOrSerialState({ searchPath }));

  it("Should call onHandleFormSubmit", async () => {
    const { result } = hook(AppRoutes.SearchMovies);
    const eventInputValueMock = {
      target: {
        value: "test_value",
      },
    };

    act(() =>
      result.current.onSetNewSearchTerm(
        eventInputValueMock as unknown as React.ChangeEvent<HTMLInputElement>
      )
    );

    expect(result.current.searchTerm).toEqual("test_value");

    act(() =>
      result.current.onHandleFormSubmit(
        eventPreventDefaultMock as unknown as React.FormEvent<HTMLFormElement>
      )
    );

    expect(eventPreventDefaultMock.preventDefault).toHaveBeenCalled();

    await waitFor(() =>
      expect(pushMock).toHaveBeenCalledWith("test_search_url")
    );
  });

  it("should not redirect to search page if searchParam is not provided", async () => {
    const { result } = hook(AppRoutes.SearchMovies);

    act(() =>
      result.current.onHandleFormSubmit(
        eventPreventDefaultMock as unknown as React.FormEvent<HTMLFormElement>
      )
    );

    await waitFor(() => expect(pushMock).not.toHaveBeenCalled());
  });
});
