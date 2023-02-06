import { useFormik } from "formik";
import { FC } from "react";

import useAuth from "../hooks/useAuth";

type FormInitialValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp: FC = () => {
  const { onSignInViaGithub, onCreateNewUser, onSignInViaGoogle } = useAuth();

  const formik = useFormik<FormInitialValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    const { name, email, password } = values;

    alert(JSON.stringify(values, null, 2));
    onCreateNewUser({ name, email, password });
  }

  function handleSignInViaGoogle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    onSignInViaGoogle();
  }

  return (
    <form className="flex flex-col p-3" onSubmit={formik.handleSubmit}>
      <input
        className="p-1 bg-slate-100 border-solid border-2 border-indigo-600"
        id="email"
        placeholder="Enter name"
        type="text"
        {...formik.getFieldProps("name")}
      />
      <input
        className="p-1 bg-slate-100 border-solid border-2 border-indigo-600"
        id="email"
        placeholder="Enter email"
        type="text"
        {...formik.getFieldProps("email")}
      />
      <input
        className="p-1 bg-slate-100 border-solid border-2 border-indigo-600"
        id="password"
        placeholder="Enter Password"
        type="password"
        {...formik.getFieldProps("password")}
      />
      <input
        className="p-1 bg-slate-100 border-solid border-2 border-indigo-600"
        id="password"
        placeholder="Confirm Password"
        type="password"
        {...formik.getFieldProps("confirmPassword")}
      />
      <button className="bg-green-400 p-1.5" type="submit">
        Submit With Credentials
      </button>
      <button
        className="bg-blue-400 p-1.5"
        onClick={(e) => handleSignInViaGithub(e)}
      >
        Login here via Github
      </button>
      <button
        className="bg-orange-400 p-1.5"
        onClick={(e) => handleSignInViaGoogle(e)}
      >
        Login here via Google
      </button>
    </form>
  );
};

export default SignUp;
