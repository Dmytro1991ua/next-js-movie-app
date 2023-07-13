import {
  Actor,
  Genre,
  ProductionCountryOrCompany,
  SpokenLanguage,
} from "@/model/common";

import { DetailsBlockTitle, DetailsPageActionButtons } from "./enums";

export type DetailsBlockPosition = "column" | "row";

export type DetailsSubtitleWithPills = (
  | Genre
  | Actor
  | SpokenLanguage
  | ProductionCountryOrCompany
)[];

export interface DetailsBlockCommonConfig {
  id: string;
  className?: string;
  position: DetailsBlockPosition;
  title: DetailsBlockTitle;
}

export interface DetailsBlockWithPillsConfig extends DetailsBlockCommonConfig {
  hasSubtitlePill?: boolean;
  list?: DetailsSubtitleWithPills;
}

export interface MovieOrSerialWithRegularSubtitle
  extends DetailsBlockCommonConfig {
  subtitle?: string | number;
}

export interface DetailsPageActionButton {
  id: string;
  url: string;
  icon: JSX.Element;
  rel?: string;
  target?: string;
  label: DetailsPageActionButtons;
  className?: string;
  disabledClassName?: string;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export interface FavoritesIconConfigItem {
  id: string;
  icon: JSX.Element;
  onClick: () => void;
  isInFavorites: boolean;
}

export interface FavoritesIconProps {
  isInFavorites: boolean;
  onFavoriteIconClick: () => void;
}
