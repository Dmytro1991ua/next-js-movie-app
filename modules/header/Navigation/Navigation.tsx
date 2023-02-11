import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import React, { FC } from "react";

import useAuth from "@/modules/auth/hooks/useAuth";
import { AppRoutes } from "@/types/enums";

const Navigation: FC = () => {
  const { onSignOut } = useAuth();

  const { data: session } = useSession();

  function handleSignOut(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    onSignOut();
  }

  return (
    <nav className="flex items-center ml-auto">
      <Link href={AppRoutes.Profile}>Profile</Link>
      <div className="ml-auto">
        {session?.user ? (
          <button className="bg-blue-600 p-2" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <button className="bg-blue-600 p-2" onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
