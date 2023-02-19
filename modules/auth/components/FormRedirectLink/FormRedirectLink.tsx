import Link from "next/link";
import React, { FC } from "react";

interface FormRedirectLinkProps {
  route: string;
  title: string;
}

const FormRedirectLink: FC<FormRedirectLinkProps> = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="text-sm text-white text-center opacity-70 underline cursor-pointer">
        {title}
      </a>
    </Link>
  );
};

export default FormRedirectLink;
