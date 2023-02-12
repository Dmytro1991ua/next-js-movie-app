import Image, { ImageProps } from "next/image";
import React, { FC } from "react";

type BackgroundImageBlockProps = ImageProps;

const BackgroundImageBlock: FC<BackgroundImageBlockProps> = ({
  src,
  alt,
  layout,
  ...props
}) => {
  return (
    <div className="layout-with-bg-image">
      <div className="img-overlay" />
      <Image
        {...props}
        alt={alt}
        data-testid="image"
        layout={layout}
        objectFit="cover"
        quality="100"
        src={src}
      />
    </div>
  );
};

export default BackgroundImageBlock;
