import React, { FC, memo } from "react";

import FormikInput from "@/components/Input/FormikInput";
import { FromInputConfig } from "@/types/interfaces";

interface FormInputsProps<T> {
  config: T[];
}

const FormInputs: FC<FormInputsProps<FromInputConfig>> = ({ config }) => {
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
