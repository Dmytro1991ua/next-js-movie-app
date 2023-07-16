import { FC, ReactNode } from "react";
import Skeleton from "react-loading-skeleton";

interface AuthLayoutSkeletonProps {
  children?: ReactNode;
}

const AuthLayoutSkeleton: FC<AuthLayoutSkeletonProps> = ({ children }) => {
  return (
    <section className="auth-layout w-[80vw] h-[75vh] bg-mantisDarker p-3 border-0">
      <Skeleton
        baseColor="#7ac142"
        containerClassName="text-center mb-4 hidden lg:flex"
        height="100%"
        highlightColor="#5a803d"
      />
      <div className="form-wrapper">{children}</div>
    </section>
  );
};

export default AuthLayoutSkeleton;
