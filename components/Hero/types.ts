import { HeroContentActionButtons } from "./enums";
import { ButtonVariant } from "../Button/Button.types";

export interface HeroContentActionButtonConfig {
  onDetailsBtnClick: () => void;
  onPlayBtnClick: () => void;
  isLoading?: boolean;
  clickedButtonId?: string | number | null;
  onHandleButtonClick?: (id: string | number, onClick: () => void) => void;
}

export interface HeroContentActionButton {
  id: HeroContentActionButtons;
  label: HeroContentActionButtons;
  icon: JSX.Element;
  variant: ButtonVariant;
  isLoading?: boolean;
  onClick: () => void;
}
