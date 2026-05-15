import NextAuth from "next-auth";

export const { auth, handlers } = NextAuth({
  providers: [],
  callbacks: {
    session({ session, token }) {
      session.user.id = token.sub;
      return session;
    },
  },
});