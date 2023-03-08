import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const HeaderSkeleton: FC = () => {
  return (
    <header className=" flex items-center p-3 bg-mantisDarker">
      <Skeleton
        baseColor="#7ac142"
        height={60}
        highlightColor="#5a803d"
        width={120}
      />
      <div className="ml-auto mr-4">
        <Skeleton
          baseColor="#7ac142"
          className="mr-2"
          containerClassName="flex items-center"
          containerTestId="header-skeleton"
          count={3}
          highlightColor="#5a803d"
          width={100}
        />
      </div>
      <Skeleton
        baseColor="#7ac142"
        height={30}
        highlightColor="#5a803d"
        width={90}
      />
    </header>
  );
};

export default HeaderSkeleton;
