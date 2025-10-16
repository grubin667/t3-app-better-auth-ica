import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { cache } from "react";
import { headers } from "next/headers";
import { magicLink } from "better-auth/plugins";
import { LoginForm } from "@/components/loginForm";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  // emailAndPassword: {
  //   enabled: true,
  //   async sendResetPassword({ url }) {
  //     console.log("Reset password URL:", url);
  //   },
  // },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, request) => {
        // show LoginForm so user can enter email addr and press Magic Link btn.
      }
    }),
    // nextCookies()
  ],
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID!,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   },
  // },
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers()
  })
})
