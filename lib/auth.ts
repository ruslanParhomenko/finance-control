import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/signin",
    error: "/not-authorized",
  },

  callbacks: {
    async signIn({ profile }) {
      const email = profile?.email?.toLowerCase();

      if (!email) {
        return false;
      }

      return email === process.env.ADMIN_EMAIL?.toLowerCase();
    },
  },
};
