import { AppRoutes } from "@/types/enums";

export type NavigationConfig = {
  id: string;
  label: string;
  url: AppRoutes;
  icon: JSX.Element;
  alt?: string;
};
