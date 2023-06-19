import { Dimensions } from "./types";

export const DEFAULT_MAX_FILE_SIZE = 200 * 1024;
export const DEFAULT_MAX_IMAGE_DIMENSION: Dimensions = {
  width: 500,
  height: 500,
};

export const ALLOWED_IMAGE_FORMATS = ["image/png", "image/jpg", "image/jpeg"];
export const INCOMPATIBLE_FILE_FORMAT_MESSAGE =
  "Invalid file format. Please upload image in PNG/JPG/JPEG formats.";
export const INCOMPATIBLE_FILE_SIZE_MESSAGE =
  "File size exceeded. Image must be a maximum of 200kb.";
export const INCOMPATIBLE_FILE_DIMENSION_MESSAGE = `Image dimensions exceed the maximum allowed size of ${DEFAULT_MAX_IMAGE_DIMENSION.width} x ${DEFAULT_MAX_IMAGE_DIMENSION.height}.`;
export const FAILED_TO_READ_FILE_MESSAGE = "Failed to read the file.";
export const FAILED_TO_RESIZE_FILE_MESSAGE = "Failed to resize the image.";
export const ACCEPTABLE_FILE_IMAGE_TYPES = { image: [".jpg", ".jpeg", ".png"] };
