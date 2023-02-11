import React, { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children?: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <section className="auth-layout">
      <div>Image Component</div>
      <div>{children}</div>
    </section>
  );
};

export default AuthLayout;
