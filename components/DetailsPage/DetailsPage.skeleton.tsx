import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const DetailsPageSkeleton: FC = () => {
  return (
    <section className="relative min-h-screen">
      <div className="details-page-content-wrapper flex-col">
        <div className="flex items-center gap-4 mb-14">
          <Skeleton
            baseColor="#7ac142"
            className="!w-[18rem] h-[2rem] xs:!w-[26.5rem] sm:!w-[46rem] lg:!w-[70rem] xl:!w-[90rem]"
            highlightColor="#5a803d"
          />
          <Skeleton
            baseColor="#7ac142"
            borderRadius="10%"
            className="!w-[7rem] h-[3rem] sm:!w-[9rem]"
            highlightColor="#5a803d"
          />
        </div>
        <div className="w-full">
          <div className="flex gap-4 items-center mb-2">
            <Skeleton
              baseColor="#7ac142"
              className="!w-[22rem] h-[2rem]
              xs:!w-[25rem] sm:!w-[40rem]"
              highlightColor="#5a803d"
            />
            <Skeleton
              baseColor="#7ac142"
              borderRadius="50%"
              height={30}
              highlightColor="#5a803d"
              width={30}
            />
          </div>
          <div className="flex mb-8">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <div key={index} className={index < 5 - 1 ? "mr-4" : ""}>
                  <Skeleton
                    baseColor="#7ac142"
                    borderRadius="50%"
                    height={20}
                    highlightColor="#5a803d"
                    width={20}
                  />
                </div>
              ))}
          </div>
          <Skeleton
            baseColor="#7ac142"
            className="mb-8"
            height={20}
            highlightColor="#5a803d"
            width={120}
          />
        </div>
        <div className="flex mb-2">
          <div className="flex gap-8">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <div key={index} className={index < 2 - 1 ? "mr-8" : ""}>
                  <Skeleton
                    baseColor="#7ac142"
                    height={60}
                    highlightColor="#5a803d"
                    width={100}
                  />
                </div>
              ))}
          </div>
        </div>
        <Skeleton
          baseColor="#7ac142"
          className="!w-[25.75rem] h-[2rem] xs:!w-[30rem] sm:!w-[40rem] mb-4"
          highlightColor="#5a803d"
        />
        <div className="flex mb-4">
          <div className="flex gap-8">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className={index < 3 - 1 ? "mr-2 xs:!w-mr-4 sm:mr-8" : ""}
                >
                  <Skeleton
                    baseColor="#7ac142"
                    className="!w-[6rem] h-[4rem] xs:!w-[8rem] xs:!h-[6rem] sm:!w-[10rem] sm:h-[6]"
                    highlightColor="#5a803d"
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="flex mb-4">
          <div className="flex gap-8">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className={index < 3 - 1 ? "mr-1 xs: mr-4 sm:mr-8" : ""}
                >
                  <Skeleton
                    baseColor="#7ac142"
                    borderRadius="10%"
                    className="!w-[6.5rem] h-[2.5rem]  xs:!w-[8rem]  xs:!h-[4rem] sm:!w-[15rem] sm:h-[6rem]"
                    highlightColor="#5a803d"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsPageSkeleton;
