import { AiFillPlayCircle } from "react-icons/ai";
import { BsFillInfoCircleFill } from "react-icons/bs";

import { HeroContentActionButtons } from "./enums";
import {
  HeroContentActionButton,
  HeroContentActionButtonConfig,
} from "./types";

export const heroContentActionButtonsConfig = ({
  onDetailsBtnClick,
  onPlayBtnClick,
  isLoading,
}: HeroContentActionButtonConfig): HeroContentActionButton[] => {
  return [
    {
      id: HeroContentActionButtons.ViewDetails,
      label: HeroContentActionButtons.ViewDetails,
      icon: <BsFillInfoCircleFill />,
      variant: "primary",
      isLoading,
      onClick: onDetailsBtnClick,
    },
    {
      id: HeroContentActionButtons.Play,
      label: HeroContentActionButtons.Play,
      icon: <AiFillPlayCircle />,
      variant: "secondary",
      isLoading,
      onClick: onPlayBtnClick,
    },
  ];
};
