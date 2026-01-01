"use client";
import TextInput from "@/components/input/text-input";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { authClient } from "@/lib/firebase-client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthForm from "./auth-form";

export default function SignInPage() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<any> = async (data) => {
    const { user } = await signInWithEmailAndPassword(
      authClient,
      data.email,
      data.password
    );
    if (!user) return;
    const res = await signIn("credentials", {
      csrfToken: await getCsrfToken(),
      email: user.email,
      uid: user.uid,
      redirect: false,
    });
    if (!res || res.error) return;

    router.replace("/home");
  };
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <div className="w-full md:w-1/4 p-4">
        <AuthForm />
        <Button
          type="submit"
          className="w-full my-2"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Вход..." : "Войти"}
        </Button>
        <div className="flex justify-between py-4">
          <Link
            href="/signup"
            className="text-sm text-blue-500 hover:underline"
          >
            signup
          </Link>
          <Link
            href="/reset-password"
            className="ml-4 text-sm text-blue-500 hover:underline"
          >
            reset password
          </Link>
        </div>
      </div>
    </FormWrapper>
  );
}
