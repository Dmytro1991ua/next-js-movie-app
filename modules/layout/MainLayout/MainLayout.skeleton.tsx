import { FC, ReactNode } from "react";

import BackgroundImageBlock from "@/components/BackgroundImageBlock";

import LayoutBgImage from "../../../public/assets/auth-layout/auth-layout-bg-big.jpg";
import HeaderSkeleton from "../../header/Header.skeleton";

interface MainLayoutSkeletonProps {
  children?: ReactNode;
}

const MainLayoutSkeleton: FC<MainLayoutSkeletonProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <HeaderSkeleton />
      <BackgroundImageBlock
        alt="Movies Banner"
        layout="fill"
        src={LayoutBgImage}
      />
      <div className="m-auto">{children}</div>
    </div>
  );
};

export default MainLayoutSkeleton;
