// app/(home)/layout.tsx
import { Suspense } from "react";
import NavMenuHeader from "@/components/nav/nav-menu";
import EditProvider from "@/providers/edit-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <EditProvider>
        <NavMenuHeader>{children}</NavMenuHeader>
      </EditProvider>
    </Suspense>
  );
}
