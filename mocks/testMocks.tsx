import { render } from "@testing-library/react";
import { Formik } from "formik";
import { RouterContext } from "next/dist/shared/lib/router-context";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { IMAGE_URL } from "@/types/constants";

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

export const mockMovie = {
  adult: false,
  backdrop_path: `${IMAGE_URL}/32GH8Mi4GmTPIQyd6IW1FFrHWrj.jpg`,
  genre_ids: [28],
  id: 965839,
  original_language: "en",
  original_title: "Lord of the Streets",
  overview:
    "When Jason Dyson refuses to make his prized fighter throw an MMA match, a notorious gangster collects his debt by killing the fighter and kidnapping Jason's daughter. Now he must train a prisoner to endure five consecutive underground fights to save her.",
  popularity: 729.236,
  poster_path: "/mbigXpUgVgLOacgxlyFfsLRFqxQ.jpg",
  release_date: "2022-04-22",
  title: "Lord of the Streets",
  video: false,
  vote_average: 5.3,
  vote_count: 46,
};

export const withQueryClientProvider = (component: JSX.Element) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};
