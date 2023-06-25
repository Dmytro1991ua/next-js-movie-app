import { v4 as uuidv4 } from "uuid";

import FormikInput from "@/components/Input/FormikInput";
import { FromInputConfig } from "@/types/interfaces";

export const PROFILE_FORM_INPUTS_CONFIG: FromInputConfig[] = [
  {
    id: uuidv4(),
    name: "email",
    placeholder: "Enter your email",
    type: "email",
    fullWidth: true,
    disabled: true,
  },
  {
    id: uuidv4(),
    name: "name",
    placeholder: "Enter your name",
    fullWidth: true,
  },
  {
    id: uuidv4(),
    name: "currentPassword",
    placeholder: "Enter your current password",
    type: "password",
    fullWidth: true,
  },
  {
    id: uuidv4(),
    name: "newPassword",
    placeholder: "Enter your new password",
    type: "password",
    fullWidth: true,
  },
  {
    id: uuidv4(),
    name: "confirmedPassword",
    placeholder: "Confirm the password",
    type: "password",
    fullWidth: true,
  },
];

export const getProfileFormInputConfigs = () => (
  <>
    {PROFILE_FORM_INPUTS_CONFIG.map((input) => {
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
