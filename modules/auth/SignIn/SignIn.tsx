import { FC } from "react";

import useAuth from "../hooks/useAuth";

const SignIn: FC = () => {
  const { onSignInViaGithub, onSignInViaGoogle } = useAuth();

  function handleSignInViaGithub(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();

    onSignInViaGithub();
  }

  function handleSignInViaGoogle(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    onSignInViaGoogle();
  }

  return (
    <>
      <div>Sign In</div>
      <div className="flex flex-col">
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
      </div>
    </>
  );
};

export default SignIn;
