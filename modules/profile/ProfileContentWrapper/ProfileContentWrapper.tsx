import React, { FC, ReactNode } from "react";

interface ProfileContentWrapperProps {
  title: string;
  subtitle: string;
  children?: ReactNode;
}

const ProfileContentWrapper: FC<ProfileContentWrapperProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <div className="flex flex-col mb-8">
      <h3 className="mb-4 text-2xl font-medium text-center">{title}</h3>
      <div className="bg-lighterBlue p-4 border-4 rounded-xl border-mantisDarker">
        <h4 className="mb-6 border-b-2 border-mantisDarker  pb-2 text-xl text-center">
          {subtitle}
        </h4>
        {children}
      </div>
    </div>
  );
};

export default ProfileContentWrapper;
