"use client";

import { useRouter } from "next/navigation";

export default function LoginButton ()  {
const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <button
        className="bg-background px-4 py-2 rounded shadow hover:bg-blue-300 transition-colors cursor-pointer  font-bold min-w-3xs"
        onClick={() =>router.push("/signin")}
      >
        sign in
      </button>
    </div>
  );
};

