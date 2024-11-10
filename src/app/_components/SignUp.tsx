"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth.client";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const signUp = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: undefined,
      },
      {
        onRequest: (ctx) => {
          console.log({ ctx });
          //show loading
        },
        onSuccess: (ctx) => {
          console.log("HELLO WORLD", ctx);
          //redirect to the dashboard
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
    console.log({ data, error });
  };
  const { data } = authClient.useSession();
  console.log({ data });
  return (
    <div className="flex flex-col gap-2">
      <input
        className="text-black"
        type="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="text-black"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        className="text-black"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0])} />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}
