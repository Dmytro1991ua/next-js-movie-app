import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const CardsSkeleton: FC = () => {
  return (
    <section className="card-wrapper" data-testid="cards">
      <div className="flex justify-start items-center w-full mb-8">
        <Skeleton
          baseColor="#7ac142"
          borderRadius="50%"
          className="mr-4"
          height={30}
          highlightColor="#5a803d"
          width={30}
        />
        <Skeleton
          baseColor="#7ac142"
          className="!w-[22rem] h-[3rem] xs:!w-[30rem]"
          highlightColor="#5a803d"
        />
      </div>
      <div className="!overflow-hidden">
        <div className="card-layout">
          {Array(18)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="xs:w-72 sm:w-96 ">
                <Skeleton
                  baseColor="#7ac142"
                  height={350}
                  highlightColor="#5a803d"
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CardsSkeleton;
