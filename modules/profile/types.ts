import { FormikProps } from "formik";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

import { ButtonVariant } from "@/components/Button/Button.types";

import { ProfileFormButtonLabel } from "./enums";

export type Dimensions = {
  width: number;
  height: number;
};

export type ResizeImageParams = {
  file: File;
  width: number;
  height: number;
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
};

export interface ProfileFormInitialValues {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmedPassword?: string;
}

export interface ProfileContent {
  formikInstance: FormikProps<ProfileFormInitialValues>;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  image: string;
  previewImage: string | null;
}

export interface ProfileFormActionsConfig {
  id: ProfileFormButtonLabel;
  label: ProfileFormButtonLabel;
  variant: ButtonVariant;
  disabled?: boolean;
  isLoading?: boolean;
  onClick: () => void;
}

export interface ProfileFormActionsProps {
  onCancel: () => void;
  onFormReset: () => void;
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  clickedButtonId?: string | number | null;
  onHandleButtonClick?: (id: string, onClick: () => void) => void;
}
