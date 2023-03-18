import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import React, { FC, useEffect, useState } from "react";

import DefaultUserPhoto from "../../public/assets/header/user.png";

interface FallbackImageProps {
  imageUrl: string | null;
  altText?: string;
  width?: string;
  height?: string;
  isActive?: boolean;
}

const FallbackImage: FC<FallbackImageProps> = ({
  imageUrl,
  altText,
  width,
  height,
  isActive = false,
}) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(
    DefaultUserPhoto
  );

  useEffect(() => {
    if (imageUrl) {
      setImgSrc(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div
      className={clsx("flex rounded-[50%] bg-powderAsh", [
        isActive ? "border-2	border-white" : "border-0	border-transparent",
      ])}
    >
      <Image
        alt={altText}
        className="rounded-[50%]"
        height={height}
        objectFit="cover"
        src={imgSrc}
        width={width}
        onError={() => setImgSrc(DefaultUserPhoto)}
      />
    </div>
  );
};

export default FallbackImage;
