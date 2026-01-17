"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="h-7 w-7 cursor-pointer rounded-md bg-gray-100 px-1"
      >
        <LogOut className="h-4 w-4 font-bold" />
      </button>
    </div>
  );
}
