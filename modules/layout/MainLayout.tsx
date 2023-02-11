import Image from "next/image";
import { useSession } from "next-auth/react";
import React, { FC, ReactNode } from "react";

import LayoutBgImage from "../../public/assets/auth-layout/auth-layout-bg-big.jpg";
import Header from "../header/Header";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { data: session } = useSession();

  const renderImageComponentFotAuthLayout = (
    <div className="layout-with-bg-image">
      {!session?.user && (
        <>
          <div className="img-overlay" />
          <Image
            alt="Movies"
            data-testid="image"
            layout="fill"
            objectFit="cover"
            quality="100"
            src={LayoutBgImage}
          />
        </>
      )}
    </div>
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
