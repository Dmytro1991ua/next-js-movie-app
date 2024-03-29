import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const SignInSkeleton: FC = () => {
  return (
    <div className="form">
      <Skeleton
        baseColor="#7ac142"
        containerClassName="block text-center mb-2"
        containerTestId="sign-in-skeleton"
        highlightColor="#5a803d"
        width={200}
      />
      <Skeleton
        baseColor="#7ac142"
        className="mb-10"
        highlightColor="#5a803d"
      />
      <Skeleton
        baseColor="#7ac142"
        className="mb-3"
        count={2}
        height={50}
        highlightColor="#5a803d"
      />
      <Skeleton
        baseColor="#7ac142"
        className="first:mt-7 mb-4"
        count={3}
        height={40}
        highlightColor="#5a803d"
      />
      <Skeleton baseColor="#7ac142" highlightColor="#5a803d" />
    </div>
  );
};

export default SignInSkeleton;
