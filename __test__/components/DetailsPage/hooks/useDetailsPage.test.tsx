import { act } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { QueryClient, QueryClientProvider } from "react-query";

import { useDetailsPage } from "@/components/DetailsPage/hooks/useDetailsPage";
import { useUpdateFavoritesMoviesOrSerials } from "@/hooks/mutations/useUpdateFavoritesMoviesOrSerials";
import {
  mockSerialCast,
  mockSerialDetails,
  mockSessionWithUser,
} from "@/mocks/testMocks";
import { homePageService } from "@/modules/home/home.service";
import { QueryString, RequestMethod } from "@/types/enums";
import {
  AddToFavoritePayload,
  RemoveFromFavoritePayload,
} from "@/types/interfaces";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("useDetailsPage", () => {
  const queryClient = new QueryClient();

  const updateFavoriteMovieOrSerialMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(homePageService, "updateFavoriteMovieOrSerial")
      .mockImplementation(updateFavoriteMovieOrSerialMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const hook = () =>
    renderHook(() =>
      useDetailsPage({
        movieOrSerialDetails: mockSerialDetails,
        movieOrSerialCast: mockSerialCast,
      })
    );

  const mockUseUpdateFavoritesMoviesOrSerials = ({
    payload,
    method,
  }: {
    payload:
      | AddToFavoritePayload["payload"]
      | RemoveFromFavoritePayload["payload"];
    method: RequestMethod;
  }) =>
    renderHook(
      () =>
        useUpdateFavoritesMoviesOrSerials({
          queryKey: QueryString.favoritesMoviesOrSerials,
          mutationFn: () => updateFavoriteMovieOrSerialMock(payload, method),
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        ),
      }
    );

  it("should call updateFavoriteMovieOrSerial with correct arguments and run addToFavorite mutation", async () => {
    hook();

    const { result } = mockUseUpdateFavoritesMoviesOrSerials({
      payload: {
        favorites: mockSerialDetails,
        user: { ...mockSessionWithUser, id: "test_id_1" },
      },
      method: RequestMethod.PUT,
    });

    await act(async () => {
      await result.current.mutate();
    });

    expect(updateFavoriteMovieOrSerialMock).toHaveBeenCalledTimes(1);
    expect(updateFavoriteMovieOrSerialMock).toHaveBeenCalledWith(
      {
        favorites: mockSerialDetails,
        user: { ...mockSessionWithUser, id: "test_id_1" },
      },
      RequestMethod.PUT
    );
  });

  it("should call updateFavoriteMovieOrSerial with correct arguments and run removeFromFavorite mutation", async () => {
    hook();

    const { result } = mockUseUpdateFavoritesMoviesOrSerials({
      payload: {
        id: "test_id",
        user: { ...mockSessionWithUser, id: "test_id_1" },
      },
      method: RequestMethod.DELETE,
    });

    await act(async () => {
      await result.current.mutate();
    });

    expect(updateFavoriteMovieOrSerialMock).toHaveBeenCalledTimes(1);
    expect(updateFavoriteMovieOrSerialMock).toHaveBeenCalledWith(
      {
        id: "test_id",
        user: { ...mockSessionWithUser, id: "test_id_1" },
      },
      RequestMethod.DELETE
    );
  });
});
