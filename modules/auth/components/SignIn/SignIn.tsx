import { Form, Formik } from "formik";
import { FC } from "react";

import {
  SIGN_IN_FORM_HEADER_SUBTITLE,
  SIGN_IN_FORM_HEADER_TITLE,
  SIGN_IN_FORM_REDIRECTION_LINK,
} from "@/modules/auth/auth.constants";
import AuthLayout from "@/modules/layout/AuthLayout";
import { AppRoutes } from "@/types/enums";

import {
  SIGN_IN_FORM_INITIAL_VALUE,
  SIGN_IN_FORM_VALIDATION,
} from "./SignIn.schema";
import SignInImage from "../../../../public/assets/auth-layout/sign-in-bg.jpg";
import { SIGN_IN_FORM_INPUTS_CONFIG } from "../../auth.configs";
import useAuth from "../../hooks/useAuth";
import FormActions from "../FormActions";
import FormHeader from "../FormHeader";
import FormInputs from "../FormInputs";

const SignIn: FC = () => {
  const {
    onSubmitFormWithCredentials,
    onSubmitFormViaGithub,
    onSubmitFormViaGoogle,
  } = useAuth();

  return (
    <AuthLayout
      alt="Sign-In Background movie"
      image={SignInImage}
      layout="fill"
    >
      <Formik
        initialValues={SIGN_IN_FORM_INITIAL_VALUE}
        validationSchema={SIGN_IN_FORM_VALIDATION}
        onSubmit={onSubmitFormWithCredentials}
      >
        {({ submitForm, isSubmitting, errors }) => {
          return (
            <Form className="form">
              <FormHeader
                subtitle={SIGN_IN_FORM_HEADER_SUBTITLE}
                title={SIGN_IN_FORM_HEADER_TITLE}
              />
              <FormInputs config={SIGN_IN_FORM_INPUTS_CONFIG} />
              <FormActions
                isDisabled={isSubmitting || Object.keys(errors).length > 0}
                route={AppRoutes.SignUp}
                title={SIGN_IN_FORM_REDIRECTION_LINK}
                onSubmitWithCredentials={submitForm}
                onSubmitWithGithub={onSubmitFormViaGithub}
                onSubmitWithGoogle={onSubmitFormViaGoogle}
              />
            </Form>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

export default SignIn;
