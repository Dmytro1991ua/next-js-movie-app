import Link from "next/link";
import React, { FC } from "react";

import { AppRoutes } from "@/types/enums";

import Navigation from "./Navigation/Navigation";

const Header: FC = () => {
  return (
    <header className="bg-gradient-to-b from-green-400 to-lime-800 flex items-center  p-3 mb-5">
      <Link href={AppRoutes.Movies}>MovieTime</Link>
      <Navigation />
    </header>
  );
};

export default Header;
