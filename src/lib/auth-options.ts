import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: { label: "Логин", type: "text" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
<<<<<<< HEAD
        if (!credentials?.login || !credentials?.password) return null;
=======
        if (!credentials?.login || !credentials?.password) {
          return null;
        }
>>>>>>> 4c50c3ded93983ffddcd8228122d821e674dc054

        try {
          const user = await prisma.patient.findFirst({
            where: { login: credentials.login },
          });

<<<<<<< HEAD
          if (!user) return null;
=======
          if (!user) {
            return null;
          }
>>>>>>> 4c50c3ded93983ffddcd8228122d821e674dc054

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

<<<<<<< HEAD
          if (!isPasswordValid) return null;
=======
          if (!isPasswordValid) {
            return null;
          }
>>>>>>> 4c50c3ded93983ffddcd8228122d821e674dc054

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.avatar_url,
          };
<<<<<<< HEAD
        } catch {
=======
        } catch (error) {
>>>>>>> 4c50c3ded93983ffddcd8228122d821e674dc054
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.picture = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
        session.user.role = token.role;
        session.user.image = token.picture as string | null | undefined;
      }
      return session;
    },
  },
};
<<<<<<< HEAD

=======
>>>>>>> 4c50c3ded93983ffddcd8228122d821e674dc054
