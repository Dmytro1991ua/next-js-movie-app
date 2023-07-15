import Resizer from "react-image-file-resizer";

import { DEFAULT_MAX_IMAGE_DIMENSION } from "@/modules/profile/constants";
import {
  handleImageDrop,
  readImageFile,
  resizeImage,
  validateImageDimensions,
} from "@/modules/profile/utils";
import * as profileUtils from "@/modules/profile/utils";
import { toastService } from "@/services/toast.service";

import {
  DEFAULT_MAX_FILE_SIZE,
  INCOMPATIBLE_FILE_DIMENSION_MESSAGE,
  INCOMPATIBLE_FILE_FORMAT_MESSAGE,
  INCOMPATIBLE_FILE_SIZE_MESSAGE,
} from "./../../../modules/profile/constants";

jest.mock("react-image-file-resizer", () => ({
  imageFileResizer: jest.fn(),
}));

jest.mock("uuid", () => {
  return {
    v4: jest.fn(() => 1),
  };
});

jest.mock("@/services/toast.service", () => ({
  toastService: {
    error: jest.fn(),
  },
}));

describe("validateImageDimensions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const image = document.createElement("img");
  const maxWidth = 1000;
  const maxHeight = 800;

  it("should return true when image dimensions are within the specified limits", () => {
    image.width = 800;
    image.height = 600;

    const result = validateImageDimensions(image, maxWidth, maxHeight);

    expect(result).toBe(true);
  });

  it("should return false when when image height exceeds the maximum allowed height", () => {
    image.width = 800;
    image.height = 900;

    const result = validateImageDimensions(image, maxWidth, maxHeight);

    expect(result).toBe(false);
  });

  it("should return false when when image dimensions exceed both the maximum width and height", () => {
    image.width = 1200;
    image.height = 900;

    const result = validateImageDimensions(image, maxWidth, maxHeight);

    expect(result).toBe(false);
  });
});

describe("resizeImage", () => {
  const mockFile = new File(["image data"], "image.jpg", {
    type: "image/jpeg",
  });
  const mockResizedFile = "resized image data";

  beforeEach(() => {
    jest.clearAllMocks();
    (Resizer.imageFileResizer as jest.Mock).mockImplementation(
      (
        _file,
        _width,
        _height,
        _fileType,
        _quality,
        _rotation,
        callback: (resizedFile: string | null) => void
      ) => {
        callback(mockResizedFile);
      }
    );
  });

  it("should resize the image and return a base64 string", async () => {
    const result = await resizeImage({
      file: mockFile,
      width: 100,
      height: 100,
    });

    expect(Resizer.imageFileResizer).toHaveBeenCalledWith(
      mockFile,
      100,
      100,
      "image/jpeg",
      100,
      0,
      expect.any(Function),
      "base64",
      undefined,
      undefined
    );

    expect(result).toEqual(mockResizedFile);
  });

  it("should return null if the image resizing fails", async () => {
    (Resizer.imageFileResizer as jest.Mock).mockImplementation(
      (
        _file,
        _width,
        _height,
        _fileType,
        _quality,
        _rotation,
        callback: (resizedFile: string | null) => void
      ) => {
        callback(null);
      }
    );

    const result = await resizeImage({
      file: mockFile,
      width: 100,
      height: 100,
    });

    expect(result).toBeNull();
  });
});

describe("readImageFile", () => {
  const mockFile: File = new File(["dummy file"], "image.png", {
    type: "image/png",
  });

  let originalCreateObjectURL: typeof URL.createObjectURL;

  beforeEach(() => {
    originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = jest.fn().mockReturnValue("mock-url");
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
  });

  it("should resolve with the result when given a file", async () => {
    const expectedResult = "data:image/png;base64,ABC123";

    const mockFileReader = {
      onload: null,
      onerror: jest.fn(),
      readAsDataURL: jest.fn(),
      result: expectedResult,
    };

    window.FileReader = jest.fn(() => mockFileReader);

    const resultPromise = readImageFile([mockFile]);

    setTimeout(() => {
      mockFileReader.onload();
    }, 100);

    resultPromise.then((result) => {
      expect(result).toEqual(expectedResult);
      expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
    });
  });

  it("should resolve with the result when given a valid image file with compatible dimensions", async () => {
    const expectedResult = "data:image/png;base64,ABC123";

    const mockFileReader = {
      onload: jest.fn(),
      onerror: jest.fn(),
      readAsDataURL: jest.fn(),
      result: expectedResult,
    };

    const mockImage = {
      src: "",
      onload: jest.fn(),
      onerror: jest.fn(),
      naturalWidth: DEFAULT_MAX_IMAGE_DIMENSION.width,
      naturalHeight: DEFAULT_MAX_IMAGE_DIMENSION.height,
    };

    window.FileReader = jest.fn(() => mockFileReader);
    window.Image = jest.fn(() => mockImage);

    const resultPromise = readImageFile([mockFile]);

    setTimeout(() => {
      mockFileReader.onload();
      mockImage.onload();
    }, 100);

    resultPromise.then((result) => {
      expect(result).toEqual(expectedResult);
      expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(mockFile);
      expect(mockFileReader.onload).toHaveBeenCalled();
      expect(mockImage.src).toEqual(expect.stringContaining(mockFile.name));
      expect(mockImage.onload).toHaveBeenCalled();
    });
  });

  it("should reject with an error when given an incompatible file format", async () => {
    const mockFileReader = {
      onload: jest.fn(),
      onerror: jest.fn(),
      readAsDataURL: jest.fn(),
    };

    window.FileReader = jest.fn(() => mockFileReader);

    const invalidFile = new File(["dummy file"], "image.txt", {
      type: "text/plain",
    });

    await expect(readImageFile([invalidFile])).rejects.toThrowError(
      INCOMPATIBLE_FILE_FORMAT_MESSAGE
    );
  });

  it("should reject with an error when given a valid image file with incompatible dimensions", async () => {
    const invalidFile = new File(["dummy file"], "image.png", {
      type: "image/png",
    });

    const mockFileReader = {
      onload: jest.fn(),
      onerror: jest.fn(),
      readAsDataURL: jest.fn(),
      result: "data:image/png;base64,ABC123",
    };

    const mockImage = {
      src: "",
      onload: jest.fn(),
      onerror: jest.fn(),
      naturalWidth: 200,
      naturalHeight: 300,
    };

    window.FileReader = jest.fn(() => mockFileReader);
    window.Image = jest.fn(() => mockImage);

    const resultPromise = readImageFile([invalidFile]);

    setTimeout(() => {
      mockFileReader.onload();
      mockImage.onload();
    }, 100);

    await expect(resultPromise).rejects.toThrowError(
      INCOMPATIBLE_FILE_DIMENSION_MESSAGE
    );
    expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(invalidFile);
  });

  it("should reject with an error when given a file with size exceeding the maximum allowed size", async () => {
    const largeFile = new File(["dummy file"], "image.png", {
      type: "image/png",
    });

    Object.defineProperty(largeFile, "size", {
      value: DEFAULT_MAX_FILE_SIZE + 1,
    });

    const mockFileReader = {
      onload: null,
      onerror: jest.fn(),
      readAsDataURL: jest.fn(function () {
        setTimeout(() => {
          if (this.onload) {
            this.onload();
          }
        }, 100);
      }),
      result: "data:image/png;base64,ABC123",
    };

    window.FileReader = jest.fn(() => mockFileReader);

    const resultPromise = readImageFile([largeFile]);

    setTimeout(() => {
      expect(mockFileReader.readAsDataURL).toHaveBeenCalledTimes(1);
      expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(largeFile);
    }, 200);

    await expect(resultPromise).rejects.toThrowError(
      INCOMPATIBLE_FILE_SIZE_MESSAGE
    );
  });
});

describe("handleImageDrop", () => {
  let originalCreateObjectURL: typeof URL.createObjectURL;

  beforeEach(() => {
    originalCreateObjectURL = URL.createObjectURL;
    URL.createObjectURL = jest.fn().mockReturnValue("mock-url");
  });

  afterEach(() => {
    URL.createObjectURL = originalCreateObjectURL;
    jest.clearAllMocks();
  });

  it("should not upload image with invalid format", async () => {
    const onSetPreviewImage = jest.fn();

    const files = [new File([], "image.jpg")];

    jest.spyOn(profileUtils, "readImageFile").mockResolvedValue("base64Image");
    jest.spyOn(profileUtils, "resizeImage").mockResolvedValue("resizedImage");

    await handleImageDrop(files, onSetPreviewImage);

    expect(toastService.error).toHaveBeenCalledWith(
      INCOMPATIBLE_FILE_FORMAT_MESSAGE
    );
  });
});
