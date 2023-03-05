import { FC, memo } from "react";

import { AppRoutes } from "@/types/enums";

import MainLayoutSkeleton from "./MainLayout.skeleton";
import { mainLayoutContentBasedOnRoute } from "../layout.config";

interface GenerateMainLayoutSkeletonProps {
  asPath: AppRoutes;
}

const GenerateMainLayoutSkeleton: FC<GenerateMainLayoutSkeletonProps> = ({
  asPath,
}): JSX.Element => {
  return (
    <MainLayoutSkeleton>
      {mainLayoutContentBasedOnRoute[asPath]}
    </MainLayoutSkeleton>
  );
};

export default memo(GenerateMainLayoutSkeleton);
