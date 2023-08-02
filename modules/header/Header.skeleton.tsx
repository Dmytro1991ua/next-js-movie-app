import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const HeaderSkeleton: FC = () => {
  return (
    <header className=" flex items-center  p-3 bg-mantisDarker">
      <Skeleton
        baseColor="#7ac142"
        className="!w-[8rem] h-[3rem] sm:!w-[12rem] sm:h-[6rem]"
        highlightColor="#5a803d"
      />
      <div className="ml-8 sm:ml-10 ">
        <Skeleton
          baseColor="#7ac142"
          className="mr-2"
          containerClassName="hidden lg:flex flex items-center"
          containerTestId="header-skeleton"
          count={3}
          highlightColor="#5a803d"
          width={100}
        />
      </div>
      <div className="flex items-center ml-auto">
        <div className="flex">
          <Skeleton
            baseColor="#7ac142"
            borderRadius="50%"
            height={50}
            highlightColor="#5a803d"
            width={50}
          />
          <div className="mr-4" />
        </div>
        <Skeleton
          baseColor="#7ac142"
          height={30}
          highlightColor="#5a803d"
          width={90}
        />
      </div>
    </header>
  );
};

export default HeaderSkeleton;
