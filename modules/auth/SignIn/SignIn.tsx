import { useFormik } from "formik";
import { FC } from "react";

import AuthLayout from "@/modules/layout/AuthLayout";

import useAuth from "../hooks/useAuth";

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
    <AuthLayout>
      <div>Sign In</div>
      <form className="flex flex-col p-3" onSubmit={formik.handleSubmit}>
        <input
          className="p-1 bg-slate-100 border-solid border-2 border-indigo-600"
          id="email"
          placeholder="Enter Email"
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
    </AuthLayout>
  );
};

export default SignIn;
