import { FC } from "react";

import useAuth from "../hooks/useAuth";

const SignIn: FC = () => {
  const { onSignInViaGithub } = useAuth();

  function handleSignInViaGithub(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault();

    onSignInViaGithub();
  }

  return (
    <>
      <div>Sign In</div>
      <button onClick={(e) => handleSignInViaGithub(e)}>Login here</button>
    </>
  );
};

export default SignIn;
