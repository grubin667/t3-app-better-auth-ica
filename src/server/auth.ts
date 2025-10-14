import { betterAuth } from "better-auth";
import { resend } from "@/helpers/email/resend";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { cache } from "react";
import { headers } from "next/headers";
import { magicLink } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ url }) {
      console.log("Reset password URL:", url);
    },
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: email,
          subject: "Magic Link",
          html: `Click the link to login into your account: ${url}`,
        });
      }
    }),
    nextCookies()
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers()
  })
})
