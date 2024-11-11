"use client";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
type UserProps = {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | undefined;
};

export default function UserProfile({ user }: { user: UserProps }) {
  const router = useRouter();
  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.refresh();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    });
  };
  return (
    <div className="flex items-start gap-5">
      <div className="flex cursor-pointer items-center">
        <div>
          <img
            alt={user.name ?? "user image"}
            src={user.image}
            className="inline-block h-9 w-9 rounded-full"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-100 group-hover:text-gray-200">
            {user.name}
          </p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-gray-600">
            {user.email}
          </p>
        </div>
      </div>
      <button onClick={signOut} className="text-sm text-gray-100">
        Sign out
      </button>
    </div>
  );
}
