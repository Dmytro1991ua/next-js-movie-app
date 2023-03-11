import { clsx } from "clsx";
import React, { FC, ReactNode } from "react";

interface LabelProps {
  id?: string;
  className?: string;
  children?: ReactNode;
}

const Label: FC<LabelProps> = ({ id, className, children }) => {
  return (
    <label
      className={clsx("block mb-2 text-base font-medium text-white", className)}
      htmlFor={id}
    >
      {children}
    </label>
  );
};

export default Label;
