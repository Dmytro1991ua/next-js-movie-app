import { isEqual } from "lodash";
import Resizer from "react-image-file-resizer";

import Button from "@/components/Button";
import FormikInput from "@/components/Input/FormikInput";
import { toastService } from "@/services/toast.service";
import { FromInputConfig } from "@/types/interfaces";

import { profileFormActionsConfig } from "./configs";
import {
  ALLOWED_IMAGE_FORMATS,
  DEFAULT_MAX_FILE_SIZE,
  DEFAULT_MAX_IMAGE_DIMENSION,
  FAILED_TO_READ_FILE_MESSAGE,
  FAILED_TO_RESIZE_FILE_MESSAGE,
  INCOMPATIBLE_FILE_DIMENSION_MESSAGE,
  INCOMPATIBLE_FILE_FORMAT_MESSAGE,
  INCOMPATIBLE_FILE_SIZE_MESSAGE,
} from "./constants";
import { ProfileFormActionsProps, ResizeImageParams } from "./types";

export const validateImageDimensions = (
  image: HTMLImageElement,
  maxWidth: number,
  maxHeight: number
): boolean => image.width <= maxWidth && image.height <= maxHeight;

export const resizeImage = ({
  file,
  width,
  height,
  quality = 100,
  maxWidth,
  maxHeight,
}: ResizeImageParams): Promise<string | null> => {
  return new Promise<string | null>((resolve) => {
    Resizer.imageFileResizer(
      file,
      width,
      height,
      file.type,
      quality,
      0,
      (resizedFile) => {
        const base64String = resizedFile as string;
        resolve(base64String);
      },
      "base64",
      maxWidth,
      maxHeight
    );
  });
};

export const readImageFile = (
  file: File[]
): Promise<string | ArrayBuffer | null> => {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const img = new Image();

      img.onload = () => {
        if (
          validateImageDimensions(
            img,
            DEFAULT_MAX_IMAGE_DIMENSION.width,
            DEFAULT_MAX_IMAGE_DIMENSION.height
          )
        ) {
          resolve(fileReader.result);
        } else {
          reject(new Error(INCOMPATIBLE_FILE_DIMENSION_MESSAGE));
        }
      };

      img.onerror = (error) => {
        reject(error);
      };
      img.src = URL.createObjectURL(file[0]);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };

    if (!file[0] || !ALLOWED_IMAGE_FORMATS.includes(file[0].type)) {
      reject(new Error(INCOMPATIBLE_FILE_FORMAT_MESSAGE));
      return;
    }

    if (file[0].size > DEFAULT_MAX_FILE_SIZE) {
      reject(new Error(INCOMPATIBLE_FILE_SIZE_MESSAGE));
      return;
    }

    fileReader.readAsDataURL(file[0]);
  });
};

export const handleImageDrop = async (
  files: File[],
  onSetPreviewImage: (value: string | null) => void
) => {
  try {
    const file = files[0];

    const base64Image = await readImageFile(files);
    const isValidImage = typeof base64Image === "string";

    const resizedImage = await resizeImage({ file, width: 500, height: 500 });

    if (!resizedImage) {
      toastService.error(FAILED_TO_RESIZE_FILE_MESSAGE);
      return;
    }

    if (!isValidImage) {
      toastService.error(FAILED_TO_READ_FILE_MESSAGE);
    }

    onSetPreviewImage(isValidImage ? resizedImage : null);
  } catch (error) {
    toastService.error((error as Error).message);
  }
};

export const getUpdatedUserName = (
  updatedName: string,
  currentName: string
) => {
  const areNamesEqual = isEqual(updatedName, currentName);

  return areNamesEqual ? currentName : updatedName;
};

export const getProfileFormInputConfigs = (
  config: FromInputConfig[]
): JSX.Element => (
  <>
    {config.map((input) => {
      const { id, name, placeholder, fullWidth, label, type, disabled } = input;

      return (
        <FormikInput
          key={id}
          disabled={disabled}
          fullWidth={fullWidth}
          id={name}
          label={label}
          name={name}
          placeholder={placeholder}
          type={type}
        />
      );
    })}
  </>
);

export const getProfileFormActions = ({
  onCancel,
  onFormReset,
  onSubmit,
  disabled,
  isLoading,
  clickedButtonId,
  onHandleButtonClick,
}: ProfileFormActionsProps) => {
  const config = profileFormActionsConfig({
    onCancel,
    onFormReset,
    onSubmit,
    disabled,
    isLoading,
  });

  return config.map(({ id, label, variant, disabled, isLoading, onClick }) => {
    return (
      <Button
        key={id}
        fullWidth
        disabled={disabled}
        isLoading={isLoading && clickedButtonId === id}
        variant={variant}
        onClick={() => {
          onHandleButtonClick && onHandleButtonClick(id, onClick);
        }}
      >
        {label}
      </Button>
    );
  });
};
