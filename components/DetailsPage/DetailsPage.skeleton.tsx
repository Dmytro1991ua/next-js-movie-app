import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const DetailsPageSkeleton: FC = () => {
  return (
    <section className="relative min-h-screen">
      <div className="details-page-content-wrapper flex-col">
        <div className="flex items-center gap-4 mb-14">
          <Skeleton
            baseColor="#7ac142"
            height={20}
            highlightColor="#5a803d"
            width={750}
          />
          <Skeleton
            baseColor="#7ac142"
            borderRadius="10%"
            height={30}
            highlightColor="#5a803d"
            width={90}
          />
        </div>
        <div className="w-full">
          <div className="flex gap-4 items-center mb-2">
            <Skeleton
              baseColor="#7ac142"
              height={20}
              highlightColor="#5a803d"
              width={300}
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
          className="mb-4"
          height={20}
          highlightColor="#5a803d"
          width={400}
        />
        <div className="flex mb-4">
          <div className="flex gap-8">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className={index < 3 - 1 ? "mr-8" : ""}>
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
        <div className="flex mb-4">
          <div className="flex gap-8">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className={index < 3 - 1 ? "mr-8" : ""}>
                  <Skeleton
                    baseColor="#7ac142"
                    borderRadius="10%"
                    height={60}
                    highlightColor="#5a803d"
                    width={150}
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
