import GoogleButton from "@/components/button/google-button";
import AuthRedirect from "@/providers/auth-redirect";
export default function Page() {
  return (
    <AuthRedirect>
      <GoogleButton />;
    </AuthRedirect>
  );
}
