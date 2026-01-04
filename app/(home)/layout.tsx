"use client";

import NavMenuHeader from "@/components/nav/nav-menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const navItems = [
  { title: "day", href: "day" },
  { title: "month", href: "month" },
  { title: "year", href: "year" },
];

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  console.log(session, status);
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/signin");
  }, [status, router]);

  if (status === "loading")
    return <p className="text-center mt-10">Загрузка...</p>;

  return (
    <div className="h-screen flex flex-col py-3  px-3">
      <NavMenuHeader navItems={navItems} />

      {children}
    </div>
  );
}
