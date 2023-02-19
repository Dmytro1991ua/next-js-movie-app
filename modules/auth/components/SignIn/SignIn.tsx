import { useFormik } from "formik";
import { FC } from "react";

import Input from "@/components/Input";
import AuthLayout from "@/modules/layout/AuthLayout";
import {
  SIGN_IN_FORM_HEADER_SUBTITLE,
  SIGN_IN_FORM_HEADER_TITLE,
  SIGN_IN_FORM_REDIRECTION_LINK,
} from "@/types/constants";
import { AppRoutes } from "@/types/enums";

import SignInImage from "../../../../public/assets/auth-layout/sign-in-bg.jpg";
import useAuth from "../../hooks/useAuth";
import FormHeader from "../FormHeader";
import FormRedirectLink from "../FormRedirectLink";

type FormInitialValues = {
  email: string;
  password: string;
};

const SignIn: FC = () => {
  const { onSignInViaGithub, onSignInViaEmailAndPAssword, onSignInViaGoogle } =
    useAuth();

  const formik = useFormik<FormInitialValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => handleSubmitWithCredentials(values),
  });

  function handleSignInViaGithub(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();

    onSignInViaGithub();
  }

  function handleSubmitWithCredentials(values: FormInitialValues): void {
    onSignInViaEmailAndPAssword(values.email, values.password);
  }

  function handleSignInViaGoogle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    onSignInViaGoogle();
  }

  return (
    <AuthLayout
      alt="Sign-In Background movie"
      image={SignInImage}
      layout="fill"
    >
      <form className="form" onSubmit={formik.handleSubmit}>
        <FormHeader
          subtitle={SIGN_IN_FORM_HEADER_SUBTITLE}
          title={SIGN_IN_FORM_HEADER_TITLE}
        />
        <Input
          required
          label="Email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Enter your email"
        />
        <Input
          required
          label="Password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Enter your password"
        />
        <button className="bg-green-400 p-1.5" type="submit">
          Sign-In with Credentials
        </button>
        <button
          className="bg-blue-400 p-1.5"
          onClick={(e) => handleSignInViaGithub(e)}
        >
          Sign-In with Github
        </button>
        <button
          className="bg-orange-400 p-1.5"
          onClick={(e) => handleSignInViaGoogle(e)}
        >
          Sign-In with Google
        </button>
        <FormRedirectLink
          route={AppRoutes.SignUp}
          title={SIGN_IN_FORM_REDIRECTION_LINK}
        />
      </form>
    </AuthLayout>
  );
};

export default SignIn;
