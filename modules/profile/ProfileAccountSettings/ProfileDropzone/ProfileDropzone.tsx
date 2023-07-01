import React, { FC, ReactNode } from "react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

interface ProfileDropzoneProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  children?: ReactNode;
}

const ProfileDropzone: FC<ProfileDropzoneProps> = ({
  getRootProps,
  getInputProps,
  children,
}) => {
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default ProfileDropzone;
