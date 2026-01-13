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
    <div className="py-20 flex flex-col gap-4 items-center justify-center">
      <Label className="text-2xl text-center text-red-600">
        not enough rights
      </Label>
      {exitButton && (
        <Button
          type="button"
          variant={"destructive"}
          className="text-rd font-bold cursor-pointer"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          exit
        </Button>
      )}
    </div>
  );
};
