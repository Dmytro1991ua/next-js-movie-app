import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const ProfileSkeleton: FC = () => {
  return (
    <section className="flex flex-col max-h-[60rem] overflow-auto mx-auto  w-full max-w-[100rem] px-3 py-3 mt-15">
      <div>
        {Array(2)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton
                baseColor="#7ac142"
                className="mb-4 text-center"
                height={20}
                highlightColor="#5a803d"
                width={250}
              />
              <Skeleton
                baseColor="#7ac142"
                className="mb-8"
                height={180}
                highlightColor="#5a803d"
                width={800}
              />
            </div>
          ))}
      </div>
      <div className="flex justify-center gap-2 items-center">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              <Skeleton
                baseColor="#7ac142"
                className="mb-8"
                height={60}
                highlightColor="#5a803d"
                width={260}
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProfileSkeleton;
