import React, { FC, ReactNode } from "react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";

interface ProfileDropzoneProps {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive: boolean;
  children?: ReactNode;
}

const ProfileDropzone: FC<ProfileDropzoneProps> = ({
  getRootProps,
  getInputProps,
  isDragActive,
  children,
}) => {
  return (
    <div
      {...getRootProps()}
      className="dropzone"
      style={{ marginTop: "10rem" }}
    >
      <input {...getInputProps()} />
      {children}
      {isDragActive ? (
        <p>Drop the image here...</p>
      ) : (
        <p>Drag and drop an image here, or click to select a file</p>
      )}
    </div>
  );
};

export default ProfileDropzone;
