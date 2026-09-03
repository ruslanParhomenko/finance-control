import { InsufficientRights } from "@/components/page/insufficient-rights";

export default function NotAuthorized() {
  return <InsufficientRights exitButton={true} />;
}
