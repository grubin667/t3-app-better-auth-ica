"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const forgetPassword = async () => {
    setLoading(true);
    await authClient.forgetPassword({
      email,
      redirectTo: "/reset-password",
      fetchOptions: {
        onSuccess: () => {
          alert("We have sent you an email for an instructions.");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
        onResponse: () => {
          setLoading(false);
        },
      },
    });
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-[500px] flex-col gap-4 text-white">
        <div className="mb-8 text-white">
          <h1 className="font-geist text-3xl font-normal tracking-tighter">
            Forget Password
          </h1>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-white"
          >
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="block w-full rounded-md border-0 py-3 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm:text-sm/6"
          />
        </div>
        <button
          disabled={email.length === 0}
          onClick={forgetPassword}
          className="font-geist relative mx-auto h-12 w-full transform-gpu overflow-hidden rounded bg-neutral-950 bg-purple-200/10 px-5 py-2.5 text-center tracking-tighter text-white transition-all duration-300 hover:bg-neutral-800 hover:bg-transparent/5 hover:ring-2 hover:ring-purple-800 hover:ring-offset-2 hover:ring-offset-zinc-900 active:bg-transparent dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]"
        >
          {loading ? (
            <span className="relative">Forgetting password...</span>
          ) : (
            <span className="relative">Forget Password</span>
          )}
        </button>
      </div>
    </div>
  );
}
