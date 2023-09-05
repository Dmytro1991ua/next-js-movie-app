import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const SignUpSkeleton: FC = () => {
  return (
    <div className="form">
      <Skeleton
        baseColor="#7ac142"
        containerClassName="block text-center mb-2.5"
        highlightColor="#5a803d"
        width={200}
      />
      <Skeleton baseColor="#7ac142" className="mb-8" highlightColor="#5a803d" />
      <Skeleton
        baseColor="#7ac142"
        className="mb-4"
        count={4}
        height={50}
        highlightColor="#5a803d"
      />
      <Skeleton
        baseColor="#7ac142"
        className="mt-4 mb-4"
        height={40}
        highlightColor="#5a803d"
      />
      <Skeleton baseColor="#7ac142" highlightColor="#5a803d" />
    </div>
  );
};

export default SignUpSkeleton;
