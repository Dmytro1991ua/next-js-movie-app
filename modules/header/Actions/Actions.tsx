import { signIn, useSession } from "next-auth/react";
import React, { FC } from "react";

import Button from "@/components/Button";
import useAuth from "@/modules/auth/hooks/useAuth";

import Avatar from "./../Avatar";

const Actions: FC = () => {
  const { onSignOut } = useAuth();

  const { data: session } = useSession();

  function handleSignOut(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    onSignOut();
  }

  const renderUserAvatar = <>{session?.user && <Avatar />}</>;

  const renderSignInOrSignOutButton = (
    <>
      {session?.user ? (
        <Button variant="primary" onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button variant="primary" onClick={() => signIn()}>
          Sign In
        </Button>
      )}
    </>
  );

  return (
    <section className="flex items-center">
      {renderUserAvatar}
      <div className="ml-2">{renderSignInOrSignOutButton}</div>
    </section>
  );
};

export default Actions;
