import { RequestMethod } from "@/types/enums";
import {
  convertResponseErrorMessageToCorrectFormat,
  getResponseErrorMessage,
} from "@/utils/utils";

describe("convertResponseErrorMessageToCorrectFormat", () => {
  it("Should return correct string based on request method", () => {
    expect(convertResponseErrorMessageToCorrectFormat(RequestMethod.GET)).toBe(
      "The request method is not valid. Only the GET method is accepted"
    );
    expect(convertResponseErrorMessageToCorrectFormat(RequestMethod.POST)).toBe(
      "The request method is not valid. Only the POST method is accepted"
    );
    expect(
      convertResponseErrorMessageToCorrectFormat(RequestMethod.DELETE)
    ).toBe(
      "The request method is not valid. Only the DELETE method is accepted"
    );
  });
});

describe("getResponseErrorMessage", () => {
  it("Should return correct error message when Movies failed to load", () => {
    expect(getResponseErrorMessage()).toBe("Failed to load Movies");
  });

  it("Should return correct error message when Serials failed to load", () => {
    expect(getResponseErrorMessage(true)).toBe("Failed to load Serials");
  });
});
