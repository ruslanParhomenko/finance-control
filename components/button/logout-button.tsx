"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogOutButton() {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-gray-100  rounded-md h-7 w-7 px-1"
      >
        <LogOut className="w-4 h-4  font-bold" />
      </button>
    </div>
  );
}
