import React, { FC, memo } from "react";

import FormikInput from "@/components/Input/FormikInput";

import { FromInputConfig } from "../../auth.types";

interface FormInputsProps {
  config: FromInputConfig[];
}

const FormInputs: FC<FormInputsProps> = ({ config }) => {
  return (
    <>
      {config.map((input) => {
        const { id, name, placeholder, fullWidth, label, type } = input;

        return (
          <FormikInput
            key={id}
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
};

export default memo(FormInputs);
