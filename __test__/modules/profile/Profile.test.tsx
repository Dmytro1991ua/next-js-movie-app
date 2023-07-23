import { fireEvent, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as formik from "formik";
import { Session } from "next-auth";
import * as useSessionHook from "next-auth/react";

import {
  MOCK_FORMIK_INSTANCE,
  mockSessionWithUser,
  withQueryClientAndSessionProvider,
} from "@/mocks/testMocks";
import * as hook from "@/modules/profile/hooks/useProfileState";
import Profile from "@/pages/profile";
import { AppRoutes } from "@/types/enums";

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

describe("Profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render component without crashing", () => {
    withQueryClientAndSessionProvider(
      <Profile />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    expect(screen.getByText(/Account Settings/)).toBeInTheDocument();
    expect(screen.getByText(/User Information/)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/)).toBeInTheDocument();
    expect(screen.getByText(/Reset Form/)).toBeInTheDocument();
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
  });

  it("should render Change Password Settings block if user signed-up via Credentials provider", () => {
    const mockSession: Session | null = {
      user: {
        id: "test_id_1",
        name: "John Doe",
        email: "john@example.com",
        isCredentialsProvider: true,
      },
      expires: "test_expired_day",
    };

    jest.spyOn(useSessionHook, "useSession").mockReturnValue({
      data: mockSession,
      status: "authenticated",
      update: jest.fn(),
    });

    withQueryClientAndSessionProvider(
      <Profile />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    expect(screen.getByText(/Change Password Settings/)).toBeInTheDocument();
    expect(screen.getByText(/Password Management/)).toBeInTheDocument();
  });

  it("Should render Reset Form and Submit buttons disabled initially", () => {
    withQueryClientAndSessionProvider(
      <Profile />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    const resetFormBtn = screen.getByText(/Reset Form/);
    const submitBtn = screen.getByText(/Submit/);

    expect(resetFormBtn).toBeDisabled();
    2;
    expect(submitBtn).toBeDisabled();
  });

  it("should leave Profile page on Cancel button click", async () => {
    const mockOnCancel = jest.fn();

    jest.spyOn(hook, "useProfileState").mockImplementation(() => ({
      getInputProps: jest.fn,
      getRootProps: jest.fn(),
      previewImage: "https://test_preview_image",
      isLoading: false,
      isRedirecting: false,
      onProfileUpdate: jest.fn(),
      onProfileFormCancel: mockOnCancel,
      onResetForm: jest.fn(),
    }));

    withQueryClientAndSessionProvider(
      <Profile />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    const cancelFormBtn = screen.getByText(/Cancel/);

    userEvent.click(cancelFormBtn);

    await waitFor(() => expect(mockOnCancel).toHaveBeenCalled());
  });

  it("should reset form on Reset Form button click", async () => {
    const mockOnResetForm = jest.fn();

    jest.spyOn(hook, "useProfileState").mockImplementation(() => ({
      getInputProps: jest.fn,
      getRootProps: jest.fn(),
      previewImage: "https://test_preview_image",
      onProfileUpdate: jest.fn(),
      isLoading: false,
      isRedirecting: false,
      onProfileFormCancel: jest.fn(),
      onResetForm: mockOnResetForm,
    }));

    withQueryClientAndSessionProvider(
      <Profile />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    const newPasswordField = screen.getByPlaceholderText(
      "Enter your current password"
    ) as HTMLInputElement;

    fireEvent.change(newPasswordField, { target: { value: "123456" } });

    expect(newPasswordField.value).toBe("123456");

    const resetFormBtn = screen.getByText(/Reset Form/);

    userEvent.click(resetFormBtn);

    await waitFor(() => expect(mockOnResetForm).toHaveBeenCalled());
  });

  it("should submit profile form on Submit button click", async () => {
    jest.spyOn(formik, "useFormik").mockReturnValue({
      ...MOCK_FORMIK_INSTANCE.formikInstance,
    });

    jest.spyOn(formik, "useField").mockReturnValue([
      {
        name: "fieldName",
        value: "123456",
        onChange: jest.fn(),
        onBlur: jest.fn(),
      },
      {
        value: "123456",
        touched: true,
        error: "mocked error",
        initialTouched: false,
      },
      { setValue: jest.fn(), setTouched: jest.fn(), setError: jest.fn() },
    ]);

    withQueryClientAndSessionProvider(
      <Profile />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    const newPasswordField = screen.getByPlaceholderText(
      "Enter your current password"
    ) as HTMLInputElement;

    fireEvent.change(newPasswordField, { target: { value: "123456" } });

    expect(newPasswordField.value).toBe("123456");

    const submitBtn = screen.getByText(/Submit/);

    fireEvent.click(submitBtn);

    await waitFor(() =>
      expect(MOCK_FORMIK_INSTANCE.formikInstance.submitForm).toHaveBeenCalled()
    );
  });

  it("should show loading state", () => {
    jest.spyOn(hook, "useProfileState").mockImplementation(() => ({
      getInputProps: jest.fn(),
      getRootProps: jest.fn(),
      previewImage: "https://test_preview_image",
      onProfileUpdate: jest.fn(),
      isLoading: true,
      isRedirecting: false,
      onProfileFormCancel: jest.fn(),
      onResetForm: jest.fn(),
    }));

    withQueryClientAndSessionProvider(
      <Profile />,
      mockSessionWithUser,
      AppRoutes.Profile
    );

    expect(screen.getByTestId("profile-skeleton")).toBeInTheDocument();
  });
});
