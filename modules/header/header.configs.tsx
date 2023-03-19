import { AiFillHome } from "react-icons/ai";
import { BiCameraMovie } from "react-icons/bi";
import { MdLocalMovies } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

import { AppRoutes } from "@/types/enums";

import { NavigationConfig } from "./header.types";
import NavigationLink from "./Navigation/NavigationLink";

export const NAVIGATION_CONFIG: NavigationConfig[] = [
  {
    id: uuidv4(),
    label: "Home",
    url: AppRoutes.Home,
    icon: <AiFillHome className="navigation-icon" />,
    alt: "Home icon",
  },
  {
    id: uuidv4(),
    label: "Movies",
    url: AppRoutes.Movies,
    icon: <BiCameraMovie className="navigation-icon" />,
    alt: "Movies icon",
  },
  {
    id: uuidv4(),
    label: "Serials",
    url: AppRoutes.Serials,
    icon: <MdLocalMovies className="navigation-icon" />,
    alt: "Serials icon",
  },
];

export const getNavigationLinks = (
  isMobileNavigation?: boolean
): JSX.Element[] => {
  return NAVIGATION_CONFIG.map(({ icon, id, label, url }) => (
    <NavigationLink
      key={id}
      icon={icon}
      isMobileNavigation={isMobileNavigation}
      label={label}
      url={url}
    />
  ));
};
