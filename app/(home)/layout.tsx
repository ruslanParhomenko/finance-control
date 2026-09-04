import { Suspense } from "react";
import NavMenuHeader from "@/components/nav-layout/nav-menu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <NavMenuHeader>{children}</NavMenuHeader>
    </Suspense>
  );
}
