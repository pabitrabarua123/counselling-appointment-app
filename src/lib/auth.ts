import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // authorize must return a plain object matching NextAuth's User shape (or null).
      // We map the Prisma user to a minimal object with string id, email and name.
      async authorize(
        credentials: { email?: string; password?: string } | undefined
      ) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) return null;

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isCorrectPassword) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? null,
          role: user.role,
          password: credentials.password,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
  if (user) {
    token.id = user.id;
    token.role = user.role;
    token.email = user.email;
    token.name = user.name;
    token.password = user.password;
  }
  return token;
},
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as number;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.password = token.password as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth/signin",
  },
};
