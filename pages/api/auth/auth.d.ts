import type { DefaultUser } from "next-auth";

export type DefaultUserWithId = DefaultUser & {
  id: string;
  isCredentialsProvider?: boolean;
};
declare module "next-auth" {
  interface Session {
    user?: DefaultUserWithId;
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    id: string;
    image?: string;
    isCredentialsProvider?: boolean;
  }
}
