import { NextApiResponse } from "next";
import { User } from "next-auth";

import { RequestMethod } from "./enums";

export interface NextAuthUser extends User {
  uid: string;
  name: string;
  email: string;
  password: string;
  image?: string;
  emailVerified?: boolean;
  authTime?: string;
}

export type CreateUser = Pick<
  NextAuthUser,
  "name" | "email" | "password" | "image"
> & {
  res: NextApiResponse;
  isUserExist?: boolean;
  method?: RequestMethod;
};

export type UpdateExistingUser = Pick<NextAuthUser, "email"> & {
  res: NextApiResponse;
};
