import clsx from "clsx";
import React, { FC } from "react";

import { ButtonProps } from "./Button.types";

const Button: FC<ButtonProps> = ({
  children,
  type = "button",
  className = "",
  variant = "primary",
  size = "normal",
  rounded = "lg",
  disabled = false,
  fullWidth = false,
  ...rest
}) => {
  const stylesConfig = {
    base: "focus:outline-none transition ease-in-out duration-300",
    size: {
      small: "px-2 py-1 text-sm",
      normal: "px-4 py-2",
      large: "px-8 py-3 text-lg",
    },
    variant: {
      primary:
        "bg-mantis hover:bg-mantisDarker text-white focus:ring-2 focus:ring-mantisDarker focus:ring-opacity-50 lg:bg-mantisDarker lg:hover:bg-mantis ",
      secondary:
        "bg-lighterBlue hover:bg-blue focus:ring-2 focus:ring-lighterBlue focus:ring-opacity-50",
      tertiary:
        "bg-lightPurple hover:bg-darkPurple focus:ring-2 focus:ring-lightPurple focus:ring-opacity-50",
      danger:
        "bg-tomato text-errorText border-2 border-tomato placeholder-errorText hover:bg-errorBg focus:ring-2 focus:ring-bg-tomato focus:ring-opacity-50 focus:border-errorBg border-2 border-solid",
    },
    disabled: "pointer-events-none shadow-inner opacity-50",
    rounded: {
      none: null,
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  };

  return (
    <button
      className={clsx([
        stylesConfig.base,
        rounded && stylesConfig.rounded[rounded],
        variant && stylesConfig.variant[variant],
        disabled && stylesConfig.disabled,
        size && stylesConfig.size[size],
        fullWidth ? "w-full" : "w-fit",
        className,
      ])}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
