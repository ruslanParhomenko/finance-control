import { Suspense } from "react";
import { HeaderBar, FooterBar } from "@/features/nav-layout";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col justify-between">
      <Suspense fallback={null}>
        <HeaderBar />
      </Suspense>
      <div className="flex-1 md:flex md:w-full md:items-center md:justify-center">
        {children}
      </div>{" "}
      <Suspense fallback={null}>
        <FooterBar />
      </Suspense>
    </div>
  );
}
