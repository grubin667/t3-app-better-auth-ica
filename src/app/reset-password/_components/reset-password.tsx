"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const resetPassword = async () => {
    setLoading(true);
    if (password === checkPassword) {
      await authClient.resetPassword({
        newPassword: password,
        fetchOptions: {
          onSuccess: () => {
            router.push("/login");
          },
          onError: (ctx) => {
            alert(ctx.error.message);
          },
          onResponse: () => {
            setLoading(false);
          },
        },
      });
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="mx-auto flex w-full max-w-[500px] flex-col gap-4 text-white">
        <div className="mb-8 text-white">
          <h1 className="font-geist text-3xl font-normal tracking-tighter">
            Reset Password
          </h1>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-white"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-3 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm:text-sm/6"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-white"
          >
            Confirm Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            onChange={(e) => setCheckPassword(e.target.value)}
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-3 pl-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 sm:text-sm/6"
          />
        </div>
        <button
          disabled={password !== checkPassword}
          onClick={resetPassword}
          className="font-geist relative mx-auto h-12 w-full transform-gpu overflow-hidden rounded bg-neutral-950 bg-purple-200/10 px-5 py-2.5 text-center tracking-tighter text-white transition-all duration-300 hover:bg-neutral-800 hover:bg-transparent/5 hover:ring-2 hover:ring-purple-800 hover:ring-offset-2 hover:ring-offset-zinc-900 active:bg-purple-600 dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#8686f01f_inset]"
        >
          {loading ? (
            <span className="relative">Reseting password...</span>
          ) : (
            <span className="relative">Reset Password</span>
          )}
        </button>
      </div>
    </div>
  );
}
