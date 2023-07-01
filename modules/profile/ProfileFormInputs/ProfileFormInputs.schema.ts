import * as yup from "yup";

import { DefaultUserWithId } from "@/pages/api/auth/auth";

import { ProfileFormInitialValues } from "../types";

export const PROFILE_FORM_INITIAL_VALUES = (
  userName: string,
  currentUser?: DefaultUserWithId | null
): ProfileFormInitialValues => {
  return {
    email: currentUser?.email ?? "",
    name: userName,
    currentPassword: "",
    newPassword: "",
    confirmedPassword: "",
  };
};

export const PROFILE_FORM_VALIDATION: yup.SchemaOf<ProfileFormInitialValues> =
  yup.object().shape(
    {
      name: yup.string().label("Name"),
      email: yup.string().email().label("Email").required(),
      currentPassword: yup
        .string()
        .label("Current Password")
        .when("newPassword", {
          is: (value: string) => value && value.length > 0,
          then: yup
            .string()
            .required("Old password is required when setting new password"),
          otherwise: yup.string(),
        }),
      newPassword: yup
        .string()
        .label("New Password")
        .when("currentPassword", {
          is: (value: string) => value && value.length > 0,
          then: yup
            .string()
            .required("Password is required when setting new password"),
          otherwise: yup.string(),
        })
        .matches(/[a-z]+/, "One lowercase character")
        .matches(/[A-Z]+/, "One uppercase character")
        .matches(/[@$!%*#?&]+/, "One special character")
        .matches(/\d+/, "One number")
        .when("currentPassword", {
          is: (value: string) => value && value.length > 0,
          then: yup
            .string()
            .required("Password is required when setting new password"),
          otherwise: yup.string(),
        })
        .test(
          "empty-or-8-characters-check",
          "Password must be at least 8 characters",
          (password) => !password || password.length >= 8
        ),
      confirmedPassword: yup
        .string()
        .label("Confirm Password")
        .when("newPassword", {
          is: (value: string) => value && value.length > 0,
          then: yup
            .string()
            .required(
              "Password confirmation is required when setting new password"
            )
            .oneOf([yup.ref("newPassword"), null], "Must match new password"),
          otherwise: yup.string(),
        }),
    },
    [["currentPassword", "newPassword"]]
  );
