import { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";

import ImageBlock from "../auth/ImageBlock/ImageBlock";

interface AuthLayoutProps {
  children?: ReactNode;
  image: string | StaticImageData;
  alt?: string;
  layout?: "fixed" | "fill" | "intrinsic" | "responsive" | undefined;
}

const AuthLayout: FC<AuthLayoutProps> = ({ image, alt, layout, children }) => {
  return (
    <section className="auth-layout">
      <ImageBlock alt={alt} layout={layout} src={image} />
      <div className="form-wrapper">{children}</div>
    </section>
  );
};

export default AuthLayout;
