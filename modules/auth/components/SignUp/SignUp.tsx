import { useFormik } from "formik";
import { FC } from "react";

import Input from "@/components/Input";
import AuthLayout from "@/modules/layout/AuthLayout";
import {
  SIGN_UP_FORM_HEADER_SUBTITLE,
  SIGN_UP_FORM_HEADER_TITLE,
  SIGN_UP_FORM_REDIRECTION_LINK,
} from "@/types/constants";
import { AppRoutes } from "@/types/enums";

import SignUpImage from "../../../../public/assets/auth-layout/sign-up-bg.webp";
import useAuth from "../../hooks/useAuth";
import FormHeader from "../FormHeader";
import FormRedirectLink from "../FormRedirectLink";

type FormInitialValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp: FC = () => {
  const { onCreateNewUser } = useAuth();

  const formik = useFormik<FormInitialValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => handleSubmitWithCredentials(values),
  });

  function handleSubmitWithCredentials(values: FormInitialValues): void {
    const { name, email, password } = values;

    onCreateNewUser({ name, email, password });
  }

  return (
    <AuthLayout
      alt="Sign-Up Background movie"
      image={SignUpImage}
      layout="fill"
    >
      <form className="form" onSubmit={formik.handleSubmit}>
        <FormHeader
          subtitle={SIGN_UP_FORM_HEADER_SUBTITLE}
          title={SIGN_UP_FORM_HEADER_TITLE}
        />
        <Input
          {...formik.getFieldProps("name")}
          placeholder="Enter your name"
        />
        <Input
          required
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Enter your email"
        />
        <Input
          required
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Enter your password"
        />
        <Input
          required
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          placeholder="Confirm password"
        />
        <button className="bg-green-400 p-1.5" type="submit">
          Create a new user with credentials
        </button>
        <FormRedirectLink
          route={AppRoutes.SignIn}
          title={SIGN_UP_FORM_REDIRECTION_LINK}
        />
      </form>
    </AuthLayout>
  );
};

export default SignUp;
