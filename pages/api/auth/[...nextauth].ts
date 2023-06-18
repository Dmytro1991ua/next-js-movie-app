import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import connectMongoDb from "@/lib/connectMongoDb";
import clientPromise from "@/lib/mongoDb";
import { Avatar } from "@/model/avatarSchema";
import { User } from "@/model/userSchema";
import { AppRoutes } from "@/types/enums";

const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT ?? "",
      clientSecret: process.env.GITHUB_SECRET_KEY ?? "",
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 40000,
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT ?? "",
      clientSecret: process.env.GOOGLE_SECRET_KEY ?? "",
      allowDangerousEmailAccountLinking: true,
      httpOptions: {
        timeout: 40000,
      },
    }),
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        await connectMongoDb();

        const existingUser = await User.findOne({ email });

        const isPasswordMath = await compare(password, existingUser.password);

        if (!isPasswordMath || existingUser.email !== existingUser.email) {
          return null;
        }

        return existingUser;
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "nextauthDb",
  }),
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: {
    signIn: AppRoutes.SignIn,
  },
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (!user) {
        return token;
      }

      await connectMongoDb();

      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        let avatar = await Avatar.findOne({ user: existingUser._id });

        avatar =
          avatar ??
          new Avatar({
            user: existingUser._id,
            image: existingUser.image,
            name: existingUser.name,
          });

        avatar.image = avatar.image || existingUser.image;
        avatar.name = avatar.name || existingUser.name;

        await avatar.save();

        existingUser.image = undefined;
        await existingUser.save();
      }

      token.id = user.id ?? "";
      token.name = user.name;
      token.email = user.email;

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        delete session.user.image;
      }

      return session;
    },

    redirect({ url, baseUrl }) {
      if (url.startsWith("/") || url.startsWith(AppRoutes.Home))
        return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;

      return baseUrl;
    },
  },
};

export default NextAuth(authOptions);
