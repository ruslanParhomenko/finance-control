"use client";

import NavMenuHeader from "@/components/nav/nav-menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  }, [status, router]);

  if (status === "loading")
    return <p className="text-center mt-10">Загрузка...</p>;

  return (
    <div className="h-screen flex flex-col pt-2  px-2">
      <NavMenuHeader />

      {children}
    </div>
  );
}
