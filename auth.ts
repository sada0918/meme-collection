import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";

export const config: NextAuthConfig = {
  providers: [GitHub],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    signIn({ account, profile }) {
      if (account?.provider === "github") {
        return profile?.login === process.env.AUTH_ALLOWED_GITHUB_LOGIN;
      }
      return false;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);
