"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-black p-1 rounded-md h-8 w-8"
      >
        <LogOut className="w-4 h-4 text-white font-bold" />
      </button>
    </div>
  );
}
