import { act, renderHook } from "@testing-library/react-hooks";
import { FormikProps } from "formik";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { useEntityMutationHandler } from "@/hooks/mutations/useEntityMutationHandler";
import createMockRouter from "@/mocks/createMockRouter";
import { MOCK_FORMIK_INSTANCE, mockSessionWithUser } from "@/mocks/testMocks";
import { useProfileState } from "@/modules/profile/hooks/useProfileState";
import { profileService } from "@/modules/profile/profile.service";
import { ProfileFormInitialValues } from "@/modules/profile/types";
import { AppRoutes, QueryString, RequestMethod } from "@/types/enums";
import { UpdateUserProfilePayload } from "@/types/interfaces";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("useProfileState", () => {
  const queryClient = new QueryClient();

  const mockFormikInstance = {
    ...MOCK_FORMIK_INSTANCE.formikInstance,
    setStatus: jest.fn(),
    setErrors: jest.fn(),
    setSubmitting: jest.fn(),
    setTouched: jest.fn(),
  } as unknown as FormikProps<ProfileFormInitialValues>;

  const updateFavoriteMovieOrSerialMock = jest.fn();
  const useRouterMock = jest.fn();
  useRouterMock.mockReturnValue({ back: useRouterMock });

  beforeEach(() => {
    jest
      .spyOn(profileService, "uploadProfileData")
      .mockImplementation(updateFavoriteMovieOrSerialMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const hook = () =>
    renderHook(
      () =>
        useProfileState({
          avatar: "https://test.avatar",
          formikInstance: mockFormikInstance,
          userName: "test_user_name",
        }),
      {
        wrapper: ({ children }: { children: React.ReactNode }) => (
          <QueryClientProvider client={queryClient}>
            <SessionProvider session={mockSessionWithUser}>
              <RouterContext.Provider
                value={createMockRouter({ pathname: AppRoutes.Profile })}
              >
                {children}
              </RouterContext.Provider>
            </SessionProvider>
          </QueryClientProvider>
        ),
      }
    );

  const mockUseEntityMutationHandler = ({
    payload,
    method,
  }: {
    payload: UpdateUserProfilePayload["payload"];
    method: RequestMethod;
  }) =>
    renderHook(
      () =>
        useEntityMutationHandler({
          queryKey: QueryString.updateProfileData,
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

  it("should call  useEntityMutationHandler with correct arguments and run  updateProfileData mutation", async () => {
    hook();

    const mockUserInfo = { name: "new_name", password: "123456" };

    const { result } = mockUseEntityMutationHandler({
      payload: {
        userInfo: mockUserInfo,
        user: { ...mockSessionWithUser, id: "test_id_1" },
      },
      method: RequestMethod.PATCH,
    });

    await act(async () => {
      await result.current.mutate();
    });

    expect(updateFavoriteMovieOrSerialMock).toHaveBeenCalledTimes(1);
    expect(updateFavoriteMovieOrSerialMock).toHaveBeenCalledWith(
      {
        userInfo: mockUserInfo,
        user: { ...mockSessionWithUser, id: "test_id_1" },
      },
      RequestMethod.PATCH
    );
  });

  it("should call onProfileUpdate method", () => {
    const { result } = hook();

    act(() => result.current.onProfileUpdate());

    expect(mockFormikInstance.resetForm).toHaveBeenCalled();
    expect(useRouterMock().back).toHaveBeenCalled();
  });

  it("should call onProfileFormCancel method", () => {
    const { result } = hook();

    act(() => result.current.onProfileFormCancel());

    expect(mockFormikInstance.resetForm).toHaveBeenCalled();
    expect(useRouterMock().back).toHaveBeenCalled();
  });

  it("should call onResetForm method", () => {
    const { result } = hook();

    act(() => result.current.onResetForm());

    expect(mockFormikInstance.resetForm).toHaveBeenCalled();
  });
});
