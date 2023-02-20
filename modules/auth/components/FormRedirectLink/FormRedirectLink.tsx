import Link from "next/link";
import React, { FC } from "react";

interface FormRedirectLinkProps {
  route: string;
  title: string;
}

const FormRedirectLink: FC<FormRedirectLinkProps> = ({ route, title }) => {
  return (
    <Link href={route}>
      <a className="text-sm text-white text-center underline cursor-pointer lg:text-white lg:opacity-70 ">
        {title}
      </a>
    </Link>
  );
};

export default FormRedirectLink;
