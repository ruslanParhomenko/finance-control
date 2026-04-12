import NavMenuHeader from "@/components/nav/nav-menu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NavMenuHeader>{children}</NavMenuHeader>;
}
