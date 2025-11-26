import NextAuth, { NextAuthOptions } from "next-auth"
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
                password: { label: "Пароль", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.login || !credentials?.password) {
                    return null;
                }

                try {
                    const user = await prisma.patient.findFirst({
                        where: { login: credentials.login },
                    });

                    if (!user) {
                        return null;
                    }

                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isPasswordValid) {
                        return null;
                    }

                    return {
                        id: user.id.toString(),
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        image: user.avatar_url,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
        }),
    ],
    pages: {
        signIn: "/",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as { role?: string }).role;
                token.picture = user.image;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.id) {
                (session.user as { id: string; role?: string }).id = token.id as string;
                (session.user as { id: string; role?: string }).role = token.role as string;
                session.user.image = token.picture as string | null | undefined;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };