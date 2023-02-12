import { useSession } from "next-auth/react";
import React, { FC, ReactNode } from "react";

import BackgroundImageBlock from "@/components/BackgroundImageBlock/BackgroundImageBlock";

import LayoutBgImage from "../../public/assets/auth-layout/auth-layout-bg-big.jpg";
import Header from "../header/Header";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  const renderImageComponentFotAuthLayout = (
    <>
      {!session?.user && (
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
