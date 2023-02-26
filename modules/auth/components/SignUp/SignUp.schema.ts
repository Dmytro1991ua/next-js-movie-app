import * as yup from "yup";

import { SignUpFormInitialValues } from "../../auth.types";

export const SIGN_UP_FORM_INITIAL_VALUE: SignUpFormInitialValues = {
  name: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

export const SIGN_UP_FORM_VALIDATION: yup.SchemaOf<SignUpFormInitialValues> =
  yup.object().shape({
    name: yup.string().label("Name"),
    email: yup.string().email().label("Email").required(),
    password: yup
      .string()
      .label("Password")
      .required()
      .min(8, "Should be at least 8 characters")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
    confirmedPassword: yup
      .string()
      .label("Confirm Password")
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required()
      .trim(),
  });
