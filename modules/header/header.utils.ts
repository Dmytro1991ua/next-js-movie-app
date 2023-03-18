export interface ScrolledImageMeasurement {
  isHeaderScrolled: boolean;
  defaultMeasurement: string;
  scrolledMeasurement: string;
}

export const getScrolledImageMeasurements = ({
  isHeaderScrolled,
  defaultMeasurement,
  scrolledMeasurement,
}: ScrolledImageMeasurement): string => {
  return isHeaderScrolled ? scrolledMeasurement : defaultMeasurement;
};

export const getHeaderActionsVariant = (isMobileScreen: boolean) => {
  return isMobileScreen ? "secondary" : "primary";
};
