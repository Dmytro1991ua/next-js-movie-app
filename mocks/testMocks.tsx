import { render } from "@testing-library/react";
import { Formik } from "formik";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import createMockRouter from "./createMockRouter";

export const mockSessionWithUser = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  user: { name: "Test user", email: "test@example.com", id: "1" },
};

export const mockSessionWithNoUser = null;

export const mockMeta = {
  touched: true,
  error: "",
  initialError: "",
  initialTouched: false,
  initialValue: "",
  value: "",
};
export const mockField = {
  value: "",
  checked: false,
  onChange: jest.fn(),
  onBlur: jest.fn(),
  multiple: undefined,
  name: "",
};

export const withFormikWrapper = (
  WrappedComponent: JSX.Element,
  initialValues: object
): JSX.Element => (
  <Formik
    initialValues={initialValues ?? {}}
    onSubmit={() => Promise.resolve()}
  >
    {WrappedComponent}
  </Formik>
);

export const MOCK_FORMIK_INSTANCE = {
  formikInstance: {
    dirty: false,
    values: jest.fn(),
    touched: jest.fn(),
    isSubmitting: false,
    isValidating: false,
    submitCount: 0,
    errors: jest.fn(),
    isValid: true,
    initialValues: jest.fn(),
    initialErrors: jest.fn(),
    initialTouched: jest.fn(),
    getFieldHelpers: jest.fn(),
    getFieldMeta: jest.fn(),
    getFieldProps: jest.fn(),
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    handleReset: jest.fn(),
    handleSubmit: jest.fn(),
    setStatus: jest.fn(),
    setErrors: jest.fn(),
    setSubmitting: jest.fn(),
    setTouched: jest.fn(),
    setValues: jest.fn(),
    setFieldValue: jest.fn(),
    setFieldError: jest.fn(),
    setFieldTouched: jest.fn(),
    validateForm: jest.fn(),
    validateField: jest.fn(),
    resetForm: jest.fn(),
    submitForm: jest.fn(),
    setFormikState: jest.fn(),
    registerField: jest.fn(),
    unregisterField: jest.fn(),
  },
};

export const mockRouter = {
  push: jest.fn(),
  pathname: "/",
  route: "",
  asPath: "",
  query: {},
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  basePath: "",
  isLocaleDomain: false,
};

export const withSessionProviderAndReactContext = ({
  path,
  session,
  component,
}: {
  path: string;
  session: Session | null;
  component: JSX.Element;
}) =>
  render(
    <SessionProvider session={session}>
      <RouterContext.Provider value={createMockRouter({ pathname: path })}>
        {component}
      </RouterContext.Provider>
    </SessionProvider>
  );

export const withSessionProvider = ({
  session,
  component,
}: {
  session: Session | null;
  component: JSX.Element;
}) => render(<SessionProvider session={session}>{component}</SessionProvider>);
