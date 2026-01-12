import { prisma } from "@/lib/db";
import NextAuth, { AuthOptions, DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// 1️⃣ Extend the default Session and User types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
  }

  interface JWT {
    role: string;
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) return null;
        if (user.password !== credentials.password) return null;

        // 2️⃣ Return object matches our extended User type
        return {
          id: user.id.toString(),
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: { strategy: "jwt" },

callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = (user as { role: string }).role; // ensure role exists
      token.sub = (user as { id: string }).id;       // ensure sub exists
    }
    return token;
  },
  async session({ session, token }) {
    session.user.id = token.sub as string;  // TypeScript now knows it's string
    session.user.role = token.role as string;
    return session;
  },
},


  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
