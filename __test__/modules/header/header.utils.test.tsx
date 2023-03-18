import {
  getHeaderActionsVariant,
  getScrolledImageMeasurements,
} from "@/modules/header/header.utils";

const defaultProps = {
  isHeaderScrolled: false,
  defaultMeasurement: "70",
  scrolledMeasurement: "50",
};

describe("getScrolledImageMeasurements", () => {
  it("should return a defaultMeasurement value when isHeaderScrolled is false", () => {
    expect(getScrolledImageMeasurements({ ...defaultProps })).toEqual(
      defaultProps.defaultMeasurement
    );
  });

  it("should return a scrolledMeasurement value when isHeaderScrolled is true", () => {
    expect(
      getScrolledImageMeasurements({ ...defaultProps, isHeaderScrolled: true })
    ).toEqual(defaultProps.scrolledMeasurement);
  });
});

describe("getHeaderActionsVariant", () => {
  it("should return secondary button styles if isMobileScreen is true", () => {
    expect(getHeaderActionsVariant(true)).toEqual("secondary");
  });

  it("should return primary button styles if isMobileScreen is false", () => {
    expect(getHeaderActionsVariant(false)).toEqual("primary");
  });
});
