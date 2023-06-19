import Image from "next/image";
import React, { FC } from "react";

import FallbackImage from "@/components/FallbackImage";
import { BLURRED_IMAGE } from "@/types/constants";

interface ProfileImagePreviewProps {
  previewImage: string | null;
  image: string;
}

const ProfileImagePreview: FC<ProfileImagePreviewProps> = ({
  previewImage,
  image,
}) => {
  return (
    <div className="flex">
      {previewImage ? (
        <Image
          alt="Preview"
          blurDataURL={BLURRED_IMAGE}
          className="rounded-[50%] bg-powderAsh"
          height={100}
          objectFit="cover"
          src={previewImage}
          width={100}
        />
      ) : (
        <FallbackImage
          altText="User Avatar"
          height="100"
          imageUrl={image}
          width="100"
        />
      )}
    </div>
  );
};

export default ProfileImagePreview;
