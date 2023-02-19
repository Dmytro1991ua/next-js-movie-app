import Link from "next/link";
import React, { FC } from "react";

import { AppRoutes } from "@/types/enums";

import Navigation from "./Navigation";

const Header: FC = () => {
  return (
    <header className="header ">
      <Link href={AppRoutes.Movies}>MovieTime</Link>
      <Navigation />
    </header>
  );
};

export default Header;
