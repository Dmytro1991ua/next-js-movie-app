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
  ...rest
}) => {
  const stylesConfig = {
    base: "border-transparent flex-1 appearance-none border w-full py-2 px-2 bg-white text-black shadow-sm text-base focus:outline-none focus:ring-black",
    state: {
      normal:
        "bg-mantis placeholder-white text-white border-2 border-mantisDarker focus:border-mantisDarker border-2 border-solid",
      error:
        "bg-errorBg text-white border-2 border-tomato placeholder-errorText focus:border-errorBg border-2 border-solid",
      disabled: "cursor-not-allowed bg-gray95 shadow-inner opacity-50",
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
