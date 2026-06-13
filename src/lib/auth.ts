import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const adminUser = {
  id: "1",
  name: "Admin",
  email: process.env.ADMIN_EMAIL || "admin@balimobility.com",
  password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || "balimob2026", 10),
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        if (
          credentials.email === adminUser.email &&
          bcrypt.compareSync(credentials.password as string, adminUser.password)
        ) {
          return { id: adminUser.id, name: adminUser.name, email: adminUser.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
