import { useFormik } from "formik";
import { FC } from "react";

import Button from "@/components/Button";
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
          fullWidth
          placeholder="Enter your name"
        />
        <Input
          required
          type="email"
          {...formik.getFieldProps("email")}
          fullWidth
          placeholder="Enter your email"
        />
        <Input
          required
          type="password"
          {...formik.getFieldProps("password")}
          fullWidth
          placeholder="Enter your password"
        />
        <Input
          required
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          fullWidth
          placeholder="Confirm password"
        />
        <div className="flex flex-col mt-5">
          <Button fullWidth className="mb-3" type="submit" value="primary">
            Create a new user with credentials
          </Button>
          <FormRedirectLink
            route={AppRoutes.SignIn}
            title={SIGN_UP_FORM_REDIRECTION_LINK}
          />
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
