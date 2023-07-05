import { renderHook } from "@testing-library/react-hooks";
import { useMutation, useQueryClient } from "react-query";

import { useUpdateProfileData } from "@/hooks/mutations/useUpdateProfileData";
import { QueryString } from "@/types/enums";

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  useQueryClient: jest.fn(),
  useMutation: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const mockQueryKey = QueryString.updateProfileData;
const mockMutationFn = jest.fn();

describe("useUpdateProfileData", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return isLoading as true initially", () => {
    const mockQueryClient = { invalidateQueries: jest.fn() };
    const mockMutationFn = jest.fn(() => Promise.resolve(null));

    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
    (useMutation as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      mutate: mockMutationFn,
    });

    const { result } = renderHook(() =>
      useUpdateProfileData({
        queryKey: mockQueryKey,
        mutationFn: jest.fn(),
      })
    );

    expect(result.current.isLoading).toBe(true);
  });

  it("should call useMutation with the correct mutationFn", () => {
    renderHook(() =>
      useUpdateProfileData({
        queryKey: mockQueryKey,
        mutationFn: mockMutationFn,
      })
    );

    expect(useMutation).toHaveBeenCalledWith(
      mockMutationFn,
      expect.any(Object)
    );
  });

  it("should call queryClient.invalidateQueries with correct data on mutation success", async () => {
    const successMessage = "Success message";
    const mutationResult = {
      message: successMessage,
      success: true,
    };

    const invalidateQueriesMock = jest.fn();
    const mockQueryClient = { invalidateQueries: invalidateQueriesMock };

    (useQueryClient as jest.Mock).mockReturnValueOnce(mockQueryClient);
    (useMutation as jest.Mock).mockImplementation((mutationFn) => {
      return {
        data: mutationResult,
        isLoading: false,
        error: null,
        mutate: async () => {
          await mutationFn();
          invalidateQueriesMock([mockQueryKey]);
        },
      };
    });

    const { result } = renderHook(() =>
      useUpdateProfileData({
        queryKey: mockQueryKey,
        mutationFn: mockMutationFn,
      })
    );

    const { data, mutate } = result.current;

    await mutate();

    expect(mockMutationFn).toHaveBeenCalled();
    expect(data).toEqual(mutationResult);
    expect(invalidateQueriesMock).toHaveBeenCalledWith([mockQueryKey]);
  });

  it("should call toastService.error on mutation failure", async () => {
    const errorMessage = "Error message";
    const mutationFnMock = jest.fn(() => Promise.resolve(null));

    (useMutation as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: new Error(errorMessage),
      mutate: mutationFnMock,
    });

    const { result } = renderHook(() =>
      useUpdateProfileData({
        queryKey: mockQueryKey,
        mutationFn: mutationFnMock,
      })
    );

    const { error, mutate } = result.current;
    await mutate();

    expect(mutationFnMock).toHaveBeenCalled();
    expect(error?.message).toBe(errorMessage);
  });
});
