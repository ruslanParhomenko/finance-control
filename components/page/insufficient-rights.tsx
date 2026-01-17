"use client";
import { Label } from "@/components/ui/label";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export const InsufficientRights = ({
  exitButton,
}: {
  exitButton?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
      <Label className="text-center text-2xl text-red-600">
        not enough rights
      </Label>
      {exitButton && (
        <Button
          type="button"
          variant={"destructive"}
          className="text-rd cursor-pointer font-bold"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          exit
        </Button>
      )}
    </div>
  );
};
