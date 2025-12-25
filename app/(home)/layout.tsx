"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  console.log(session, status);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  }, [status, router]);

  if (status === "loading") return <p className="text-center mt-10">Загрузка...</p>;

  return <div className="min-h-screen flex flex-col">{children}</div>;
}
