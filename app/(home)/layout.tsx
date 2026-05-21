import NavMenuHeader from "@/components/nav/nav-menu";
import EditProvider from "@/providers/edit-provider";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EditProvider>
      <NavMenuHeader>{children}</NavMenuHeader>
    </EditProvider>
  );
}
