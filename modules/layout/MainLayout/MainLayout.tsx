import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FC, ReactNode } from "react";

import BackgroundImageBlock from "@/components/BackgroundImageBlock";
import Header from "@/modules/header";
import { AppRoutes, SeeMorePageRoutes } from "@/types/enums";

import GenerateMainLayoutSkeleton from "./GenerateMainLayoutSkeleton";
import LayoutBgImage from "../../../public/assets/auth-layout/auth-layout-bg-big.jpg";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const { route } = useRouter();

  if (status === "loading") {
    return (
      <GenerateMainLayoutSkeleton
        asPath={route as AppRoutes | SeeMorePageRoutes}
      />
    );
  }

  const renderImageComponentFotAuthLayout = (
    <>
      {!session?.user && status === "unauthenticated" && (
        <BackgroundImageBlock
          alt="Movies Banner"
          layout="fill"
          src={LayoutBgImage}
        />
      )}
    </>
  );

  return (
    <section className="main-layout">
      <Header />
      {renderImageComponentFotAuthLayout}
      {children}
    </section>
  );
};

export default MainLayout;
