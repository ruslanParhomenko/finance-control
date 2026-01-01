"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthForm from "./auth-form";
import { FormWrapper } from "@/components/wrapper/form-wrapper";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authClient } from "@/lib/firebase-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<any> = async (data) => {
    const res = await createUserWithEmailAndPassword(
      authClient,
      data.email,
      data.password
    );
    if (!res) return;
    router.push("/signin");
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
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Создание..." : "Создать аккаунт"}
        </Button>
        <div className="flex justify-between py-4">
          <Link
            href="/signin"
            className="text-sm text-blue-500 hover:underline"
          >
            Уже есть аккаунт? Войти
          </Link>
        </div>
      </div>
    </FormWrapper>
  );
}
