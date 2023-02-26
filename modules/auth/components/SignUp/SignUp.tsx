import { Form, Formik } from "formik";
import { FC } from "react";

import {
  SIGN_UP_FORM_HEADER_SUBTITLE,
  SIGN_UP_FORM_HEADER_TITLE,
  SIGN_UP_FORM_REDIRECTION_LINK,
} from "@/modules/auth/auth.constants";
import AuthLayout from "@/modules/layout/AuthLayout";
import { AppRoutes } from "@/types/enums";

import {
  SIGN_UP_FORM_INITIAL_VALUE,
  SIGN_UP_FORM_VALIDATION,
} from "./SignUp.schema";
import SignUpImage from "../../../../public/assets/auth-layout/sign-up-bg.webp";
import { SIGN_UP_FORM_INPUTS_CONFIG } from "../../auth.configs";
import useAuth from "../../hooks/useAuth";
import FormActions from "../FormActions";
import FormHeader from "../FormHeader";
import FormInputs from "../FormInputs";

const SignUp: FC = () => {
  const { onSubmitFormAndCreateNewUser } = useAuth();

  return (
    <AuthLayout
      alt="Sign-Up Background movie"
      image={SignUpImage}
      layout="fill"
    >
      <Formik
        initialValues={SIGN_UP_FORM_INITIAL_VALUE}
        validationSchema={SIGN_UP_FORM_VALIDATION}
        onSubmit={onSubmitFormAndCreateNewUser}
      >
        {({ submitForm, isSubmitting, errors }) => (
          <Form className="form">
            <FormHeader
              subtitle={SIGN_UP_FORM_HEADER_SUBTITLE}
              title={SIGN_UP_FORM_HEADER_TITLE}
            />
            <FormInputs config={SIGN_UP_FORM_INPUTS_CONFIG} />
            <FormActions
              isSignUpForm
              isDisabled={isSubmitting || Object.keys(errors).length > 0}
              route={AppRoutes.SignIn}
              title={SIGN_UP_FORM_REDIRECTION_LINK}
              onSubmitWithCredentials={submitForm}
            />
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignUp;
