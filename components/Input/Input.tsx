import { clsx } from "clsx";
import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import Label from "../Label";

type RoundedInput = "sm" | "md" | "lg";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  name?: string;
  id?: string;
  type?: string;
  label?: string;
  error?: boolean;
  errorText?: string;
  required?: boolean;
  disabled?: boolean;
  rounded?: RoundedInput;
  placeholder?: string;
  className?: string;
  isBaseInput?: boolean;
  fullWidth?: boolean;
}

const Input: FC<InputProps> = ({
  id = uuidv4(),
  name = "",
  label = "",
  error = false,
  errorText = "",
  required = false,
  type = "text",
  disabled = false,
  rounded = "lg",
  placeholder = "",
  className = "",
  isBaseInput = false,
  fullWidth = false,
  ...rest
}) => {
  const stylesConfig = {
    base: "border-transparent flex-1 placeholder-darkBlue appearance-none border py-2 px-2 bg-white text-darkBlue shadow-sm text-base focus:outline-none focus:ring-black",
    state: {
      general:
        "!bg-white !text-darkBlue !placeholder-darkBlue !border-2 !border-solid !border-mantis !focus:border-mantisDarker",
      normal:
        "bg-mantis placeholder-white text-white border-2 border-mantisDarker focus:border-mantisDarker border-2 border-solid",
      error:
        "bg-errorBg border-2 border-tomato !placeholder-errorText focus:border-errorBg border-2 border-solid",
      disabled: "pointer-events-none shadow-inner opacity-50",
    },
    rounded: {
      none: null,
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
    },
  };

  return (
    <div className={clsx("relative", [error && errorText ? "mb-8" : "mb-4.5"])}>
      {label && (
        <Label id={id}>
          {label} {required && "*"}
        </Label>
      )}
      <input
        className={clsx([
          stylesConfig.base,
          rounded && stylesConfig.rounded[rounded],
          error ? stylesConfig.state.error : stylesConfig.state.normal,
          disabled && stylesConfig.state.disabled,
          isBaseInput && stylesConfig.state.general,
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
      {error && (
        <p className="absolute -bottom-5.5 pl-3 text-sm text-tomato">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
