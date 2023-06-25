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
