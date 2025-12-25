import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "./firebase-client";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: "Email & Password",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Нет email или пароля");
        }

        const userCredential = await signInWithEmailAndPassword(
          firebaseAuth,
          credentials.email,
          credentials.password
        );

        const user = userCredential.user;

        if (!user.email) return null;

        return {
          id: user.uid,
          email: user.email,
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
