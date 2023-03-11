import { RequestMethod } from "@/types/enums";

export const convertResponseErrorMessageToCorrectFormat = (
  method: RequestMethod
): string =>
  `The request method is not valid. Only the ${method} method is accepted`;

export const classNames = (...classes: string[]) => {
  return classes?.filter(Boolean).join(" ");
};
