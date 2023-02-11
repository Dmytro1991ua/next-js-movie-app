import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { compare } from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import connectMongoDb from "@/lib/connectMongoDb";
import clientPromise from "@/lib/mongoDb";
import { User } from "@/model/user";
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
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "nextauthDb",
  }),
  pages: {
    signIn: AppRoutes.SignIn,
  },
  callbacks: {
    async signIn({ user }) {
      const filterUsersByEmail = { email: user.email };
      const filterOptions = {
        upsert: true,
        new: true,
      };

      await User.findOneAndUpdate(
        filterUsersByEmail,
        {
          image: user?.image,
        },
        filterOptions
      );

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
