import Image, { ImageProps } from "next/image";
import React, { FC } from "react";

type ImageBlockProps = ImageProps & { testId?: string };

const ImageBlock: FC<ImageBlockProps> = ({ src, alt, layout, ...props }) => {
  return (
    <div className="auth-layout-img-wrapper ">
      <div className="auth-layout-img-overlay" />
      <Image
        {...props}
        alt={alt}
        className="auth-layout-img"
        data-testid="image"
        layout={layout}
        objectFit="cover"
        src={src}
      />
    </div>
  );
};

export default ImageBlock;
