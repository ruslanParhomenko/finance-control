"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AuthRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { status, data } = useSession();
  const isAdmin = data?.user?.role === "ADMIN";
  console.log(data);
  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace("/");
      return;
    }

    if (status === "authenticated" && isAdmin) router.replace("/home");
  }, [status, isAdmin, router]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <span>Loading...</span>
      </div>
    );
  }

  return <>{children}</>;
}
