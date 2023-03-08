import React, { FC } from "react";

import Logo from "./Logo";
import Navigation from "./Navigation";

const Header: FC = () => {
  return (
    <header className="header ">
      <Logo />
      <Navigation />
    </header>
  );
};

export default Header;
