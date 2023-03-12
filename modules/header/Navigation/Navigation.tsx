import React, { FC } from "react";

const Navigation: FC = () => {
  return (
    <nav className="navigation">
      <ul className="flex items-center">
        <li className="mr-2">Home</li>
        <li>Serials</li>
      </ul>
    </nav>
  );
};

export default Navigation;
