import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import { pages } from "next/dist/build/templates/app-page";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "Phone Number",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials: any) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const isUser = await prisma.user.findFirst({
          where: { phone: credentials.phone },
        });
        if (isUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            isUser.password
          );
          if (passwordValidation) {
            return {
              id: isUser.id,
              name: isUser.name,
              email: isUser.id,
              phone: isUser.id,
            };
          } else {
            return null;
          }
        }
        try {
          const user = await prisma.user.create({
            data: {
              phone: credentials.phone,
              password: hashedPassword,
              email: "",
            },
          });
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (err) {
          console.log(err);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      return session;
    },
  },
  pages: {
    signIn: "./signin",
  },
};

// export default NextAuth(authOptions)
