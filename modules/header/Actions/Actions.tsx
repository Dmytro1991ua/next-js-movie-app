import clsx from "clsx";
import { useSession } from "next-auth/react";
import React, { FC, useMemo} from "react";

import Button from "@/components/Button";
import { useButtonAction } from "@/hooks/ueButtonAction";
import useAuth from "@/modules/auth/hooks/useAuth";

import Avatar from "./../Avatar";
import { getHeaderActionsVariant } from "../header.utils";

interface ActionsProps {
  isMobileScreen?: boolean;
}

const Actions: FC<ActionsProps> = ({ isMobileScreen = false }) => {
  const { onSignOut } = useAuth();

  const { data: session } = useSession();
  const { isSubmitting, onSubmitting } = useButtonAction();

  const actionVariant = useMemo(
    () => getHeaderActionsVariant(isMobileScreen),
    [isMobileScreen]
  );

  function handleSignOut(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();

    onSubmitting();

    onSignOut();
  }

  return (
    <section
      className={clsx("hidden md:flex items-center", [
        isMobileScreen ? "!flex" : "!ml-auto",
        !session?.user && "!flex",
      ])}
    >
      {session?.user && <Avatar />}
      <div className="ml-2">
        {session?.user && (
          <Button
            isLoading={isSubmitting}
            variant={actionVariant}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        )}
      </div>
    </section>
  );
};

export default Actions;
