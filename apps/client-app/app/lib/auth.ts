import prisma from "@repo/db/client";
import bcrypt from "bcrypt";
import { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
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
              email: isUser.email,
              phone: isUser.phone,
            };
          } else {
            return null;
          }
        } else {
          try {
            const user = await prisma.user.create({
              data: {
                phone: credentials.phone,
                password: hashedPassword,
                email: credentials.phone,
              },
            });
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              phone: user.phone,
            };
          } catch (err) {
            console.log(err);
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        if (user.phone) {
          token.phone = user.phone;
        }
      }
      return token;
    },
    async session({ session, token, user }: any) {
      if (session && session.user) {
        session.user.id = token.id;
        if (session.user.phone === token.phone) {
        }
        return session;
      }
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
  // pages: {
  //   signIn: "./signin",
  // },
};

// export default NextAuth(authOptions)
