import { clsx } from "clsx";
import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { InputProps } from "./Input.types";
import Label from "../Label";

const Input: FC<InputProps> = ({
  id = uuidv4(),
  name = "",
  label = "",
  error = false,
  required = false,
  type = "text",
  disabled = false,
  rounded = "lg",
  placeholder = "",
  className = "",
  isBaseInput = false,
  fullWidth = false,
  hasIcon = false,
  icon,
  ...rest
}) => {
  const commonInputStyles =
    "border-transparent flex-1 appearance-none border py-2 px-2 shadow-sm text-base focus:outline-none focus:ring-black";

  const stylesConfig = {
    state: {
      general: `${commonInputStyles} bg-white text-darkBlue !placeholder-darkBlue border-2 border-solid border-mantis !focus:border-mantisDarker`,
      normal: `${commonInputStyles} bg-mantis placeholder-white text-white border-2 border-mantisDarker focus:border-mantisDarker border-2 border-solid`,
      error: `${commonInputStyles} bg-errorBg border-2 border-tomato !placeholder-errorText focus:border-errorBg border-2 border-solid`,
      disabled: `${commonInputStyles} pointer-events-none shadow-inner opacity-50`,
      search:
        "bg-transparent border-y-0 border-r-0 border-l-0 border-b-2 placeholder:opacity-50 pl-10",
    },
    rounded: {
      none: null,
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  };

  return (
    <label className={clsx("relative", [fullWidth ? "w-full" : "w-fit"])}>
      {label && (
        <Label id={id}>
          {label} {required && "*"}
        </Label>
      )}
      <input
        className={clsx([
          rounded && stylesConfig.rounded[rounded],
          error ? stylesConfig.state.error : stylesConfig.state.normal,
          disabled && stylesConfig.state.disabled,
          isBaseInput && stylesConfig.state.general,
          hasIcon && stylesConfig.state.search,
          fullWidth ? "w-full" : "w-fit",
          className,
        ])}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
        {...rest}
      />
      {hasIcon && icon}
    </label>
  );
};

export default Input;
