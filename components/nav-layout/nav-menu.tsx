import HeaderBar from "./header-bar/header-bar";
import FooterBar from "./footer-bar/footer-bar";

export default function NavMenuHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh flex-col justify-between">
      <HeaderBar />

      <div className="flex-1 md:flex md:w-full md:items-center md:justify-center">
        {children}
      </div>

      <FooterBar />
    </div>
  );
}
