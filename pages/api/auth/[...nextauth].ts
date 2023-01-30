import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT ?? "",
      clientSecret: process.env.GITHUB_SECRET_KEY ?? "",
    }),
  ],
  secret: process.env.JWT_SECRET,
  session: {
    strategy: "jwt",
  },
});
