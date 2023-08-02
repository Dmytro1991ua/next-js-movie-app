import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const HeroSkeleton: FC = () => {
  return (
    <section className="relative min-h-screen overflow-x-hidden">
      <div className="absolute top-[30%] left-[5%] lg:top-[45%] xl:max-w-[85rem] 2xl:max-w-[108rem]">
        <Skeleton
          baseColor="#7ac142"
          className="!w-[27rem] h-[2rem] sm:!w-[40rem] mb-4"
          highlightColor="#5a803d"
        />
        <div className="flex mb-4">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={index < 5 - 1 ? "mr-4" : ""}>
                <Skeleton
                  baseColor="#7ac142"
                  borderRadius="50%"
                  height={30}
                  highlightColor="#5a803d"
                  width={30}
                />
              </div>
            ))}
        </div>
        <Skeleton
          baseColor="#7ac142"
          className="mb-2"
          height={20}
          highlightColor="#5a803d"
          width={200}
        />
        <Skeleton
          baseColor="#7ac142"
          className="!w-[27rem] h-[3rem] sm:!w-[50rem] mb-2"
          count={2}
          highlightColor="#5a803d"
        />
        <div className="flex mb-4 mt-4">
          {Array(2)
            .fill(null)
            .map((_, index) => (
              <div key={index} className={index < 2 - 1 ? "mr-4" : ""}>
                <Skeleton
                  baseColor="#7ac142"
                  borderRadius="20%"
                  height={45}
                  highlightColor="#5a803d"
                  width={100}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
