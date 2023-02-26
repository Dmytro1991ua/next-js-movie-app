import { clsx } from "clsx";
import React, { FC } from "react";

interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

const FormHeader: FC<FormHeaderProps> = ({ title, subtitle = "" }) => {
  return (
    <div className="flex flex-col items-center mb-5 border-b-2 border-white pb-2.5 lg:border-mantisDarker">
      <h3
        className={clsx("text-lg font-medium uppercase", [
          subtitle ? "mb-2" : "mb-0",
        ])}
      >
        {title}
      </h3>
      {subtitle && <h4 className="text-sm opacity-70">{subtitle}</h4>}
    </div>
  );
};

export default FormHeader;
