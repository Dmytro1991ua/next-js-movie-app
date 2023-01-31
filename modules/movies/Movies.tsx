import { FC } from "react";

import useAuth from "../auth/hooks/useAuth";

const Movies: FC = () => {
  const { onSignOut } = useAuth();

  function handleSignOut(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    onSignOut();
  }

  return (
    <>
      <div>Movies</div>
      <button className="bg-green-600 p-2" onClick={(e) => handleSignOut(e)}>
        Sign Out
      </button>
    </>
  );
};

export default Movies;
