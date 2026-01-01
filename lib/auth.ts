import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "text" },
        uid: { type: "text" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.uid) {
          return null;
        }

        return {
          id: credentials.uid,
          email: credentials.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
  },

  debug: true,
  

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).uid = token.uid;
      }
      return session;
    },
  },
};
