import { FC } from "react";

import { useProfileState } from "./hooks/useProfileState";
import ProfileDropzone from "./ProfileDropzone/ProfileDropzone";
import ProfileImagePreview from "./ProfileImagePreview/ProfileImagePreview";

const Profile: FC = () => {
  const {
    getInputProps,
    getRootProps,
    onImageUpload,
    userAvatar,
    previewImage,
    isDragActive,
  } = useProfileState({ profileData: undefined });

  return (
    <>
      <ProfileDropzone
        getInputProps={getInputProps}
        getRootProps={getRootProps}
        isDragActive={isDragActive}
      >
        <ProfileImagePreview image={userAvatar} previewImage={previewImage} />
      </ProfileDropzone>
      <button onClick={onImageUpload}>Upload</button>
    </>
  );
};

export default Profile;
