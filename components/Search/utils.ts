import { AppRoutes } from "@/types/enums";

export const getSearchRedirectUrl = (
  searchPath: AppRoutes,
  searchParam: string | null
): string => {
  return `${searchPath}/${searchParam?.trim()}`;
};
