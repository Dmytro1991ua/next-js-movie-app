import React, { FC } from "react";
import Skeleton from "react-loading-skeleton";

const ProfileSkeleton: FC = () => {
  return (
    <section
      className="flex flex-col max-h-[60rem] overflow-auto mx-auto  w-full max-w-[100rem] px-3 py-3 mt-15"
      data-testid="profile-skeleton"
    >
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
                className="!w-[27rem] h-[18rem] xs:!w-[37rem] sm:!w-[45rem] lg:!w-[80rem] mb-8"
                highlightColor="#5a803d"
              />
            </div>
          ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-2 items-center">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              <Skeleton
                baseColor="#7ac142"
                className="h-[6rem] !w-[26rem] sm:!w-[14.5rem] lg:!w-[26rem] mb-2 sx:mb-8"
                highlightColor="#5a803d"
              />
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProfileSkeleton;
